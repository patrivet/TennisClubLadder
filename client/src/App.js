import React, { useState, useEffect } from 'react';
import './App.scss';
import ApiService from './components/ApiService';

/* IMPORT: other functions */
import Header from './components/Header';
import Ladder from './containers/Ladder';
import PlayerChallengeAndResults from './containers/PlayerChallengeAndResults';
import LadderResults from './containers/LadderResults';
import QuoteRandomiser from './components/QuoteRandomiser';
import './components/Header.scss';
import './components/LadderPlayer.scss';
import './components/Ladder.scss';
import './components/PlayerChallengeAndResults.scss';
import './components/LadderResults.scss';
import './components/OpenChallenge.scss';
import './components/Challenge.scss';
function App() {
  const [ladder, setLadder] = useState({});
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  let loggedInPlayer = {}; // FIX ME - replace with real session logged in.

  useEffect( () => {
    // Get all DB data. FIX ME: move this to another component & make more DRY.
    console.log('INFO: app.js:: useEffect: fetching DB data..');
    // Get ladders
    ApiService.getLadders()
      .then(ladders => {
        // only 1 ladder from ladders used for MVP, so pick 1st in return array
        setLadder(ladders[0])
      })
      .catch( err => { console.log(`ERROR App.js:: useEffect() getPlayers Error =`); console.log(err) } );
    // Get players
    ApiService.getPlayers()
    .then(players => {
      setPlayers(players);
    })

    .catch( err => { console.log(`ERROR App.js:: useEffect() getChallenges Error =`); console.log(err) } );
    // Get challenges
    ApiService.getChallenges()
      .then(challenges => {
        // Set the player objects onto the challenges.
        challenges.forEach(c => {
          c.challenger = getPlayerForId(c.challengerId);
          c.challenged = getPlayerForId(c.challengedId);
          c.winner = getPlayerForId(c.winnerId);
          c.loser = getPlayerForId(c.loserId);
        })
        setChallenges(challenges)
      })
      .catch( err => { console.log(`ERROR App.js:: useEffect() getChallenges Error =`); console.log(err) } );
  }, [])

  // Update entire challenge Object
  function updateChallenge(challenge) {
    // FIX ME - do this elsewhere- own Challenge component?
    setFakeLoggedInPlayer();

    console.log("INFO: app.js::: running updateChallenge");
    console.log(challenges);

    // ======= Update the challenge

    // ) set the challenge statusSummaryText  e.g.  "Ken beat Paul"

    // set lastUpdated (date) to now.
    challenge.lastUpdated = Date.now();

    // ====== Update the corresponding player fields
    // ====== Update the ladder.
    // Update players, ladder and challenge state
    setPlayers( (previousPlayers) => {
      return [...previousPlayers]
    });
  }

  function createChallenge(challengedPlayer) {
    // PARAMS: challengedPlayer ( player object )
    setFakeLoggedInPlayer();

    // - create challenge object
    const challengeToCreate = {
      challengerId: loggedInPlayer._id,
      challengedId: challengedPlayer._id,
      challenger: loggedInPlayer,
      challenged: challengedPlayer,
      playersIds: [loggedInPlayer._id, challengedPlayer._id],
      statusSummaryText : loggedInPlayer.firstName + ' ' + loggedInPlayer.lastName + ' challenged ' + challengedPlayer.firstName + ' ' + challengedPlayer.lastName
    }
    // - call POST challenge passing object
    ApiService.postChallenge(challengeToCreate)
      .then(newChallenge => {

        // Update two players' challengeIds array.
        challengedPlayer.challengeIds.push(newChallenge._id);
        ApiService.putPlayer(challengedPlayer);

        loggedInPlayer.challengeIds.push(newChallenge._id);
        ApiService.putPlayer(loggedInPlayer);

        // Update states
        setChallenges( (previousChallenges) => {
          return [...previousChallenges, newChallenge]
        });
        setPlayers( (previousPlayers) => {
          return [...previousPlayers]
        });
      })
      .catch( err => {
        console.log(`ERROR App.js:: createChallenge() Error =`); console.log(err)
      });

    // FIX ME Send email to challengedId player using html template
  }

  const setFakeLoggedInPlayer = () => {
    // FIX ME - delete his function and all callers.
    loggedInPlayer = players[9];
    return loggedInPlayer
  }

  const getPlayerForId = (idToFind) => {
    let playerFound = players.find(element => element._id == idToFind);
    if (!playerFound) console.log('WARNING: No player found with _id =', idToFind);
    return playerFound
  }

  return (

    <>
      <Header />
      <QuoteRandomiser />

      {/* ---------- MAIN CONTAINER -------------------- */}
      <div className="ladderAndResultsContainer">
        <div className="ladder">
          <Ladder loggedInPlayer={setFakeLoggedInPlayer} players={players} createChallenge={createChallenge}></Ladder>
        </div>
        <div className="playerAndLadderResults">
          <div className="playerChallengeAndResults">
            <PlayerChallengeAndResults loggedInPlayer={setFakeLoggedInPlayer} challenges={challenges} updateChallenge={updateChallenge}></PlayerChallengeAndResults>
          </div>
          <div className="ladderResults">
            <LadderResults challenges={challenges}></LadderResults>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
