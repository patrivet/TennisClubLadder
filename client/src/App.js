import React, { useState, useEffect } from 'react';
import './App.scss';
import ApiService from './components/ApiService';

/* IMPORT: other functions */
import Ladder from './containers/Ladder';
import PlayerChallengeAndResults from './containers/PlayerChallengeAndResults';
import LadderResults from './containers/LadderResults';
import QuoteRandomiser from './components/QuoteRandomiser';

import './components/LadderPlayer.scss';
import './components/Ladder.scss';
import './components/PlayerChallengeAndResults.scss';
import './components/LadderResults.scss';
import './components/OpenChallenge.scss';
import './components/Challenge.scss';
import tennisBallSpinning from './imgs/tennis-ball-spinning.gif'

function App() {
  const [ladder, setLadder] = useState({});
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  let loggedInPlayer = {};

  useEffect( () => {
    console.log('INFO: app.js:: useEffect: fetching DB data..');
    Promise.all([ApiService.getLadders(), ApiService.getPlayers(), ApiService.getChallenges()]).then( (values) => {
      setLadder(values[0][0]);
      setPlayers(values[1]);
      const challenges = values[2];
      challenges.forEach( c => {
        c.lastUpdated = new Date(c.lastUpdated);
        c.created = new Date(c.created);
      });
      setChallenges(challenges);
      setDataFetched(true);
    }).catch( err => { console.log(`ERROR App.js:: useEffect() PromiseAll fetching data has error =`); console.log(err) } );
  }, [])

  useEffect( () => {
    fixUpPlayerObjects();
  }, [challenges])

  function fixUpPlayerObjects() {
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const pId = challenge.challengerId;
      if (pId) {
        // get the player object from players with _id matching challenger_id
        const p = getPlayerForId(pId);
        if (!p) {console.log('WARNING: Challenge =' + i + 'has no challengerId');}
        else {
          challenge.challenger = null;
          challenge.challenger = p;
        }
      } else {
        console.log('WARNING: Challenge =' + i + 'has no challengerId');
      }
    }
  }

  // Update entire challenge Object
  function updateChallenge(challenge) {
    setLoggedInPlayer();

    console.log("INFO: app.js::: running updateChallenge");
    // ======= (1) Update local objects ...
    // === (a) Update the challenge
    // set lastUpdated (date) to now.
    challenge.lastUpdated = Date.now();

    // === (b) player fields & ladder - done in openChallenge

    // ====== (2) DB update::: Update Challenge & player(s) object in DB
    ApiService.putChallenge(challenge);
    ApiService.putPlayer(getPlayerForId(challenge.challenger._id));
    ApiService.putPlayer(getPlayerForId(challenge.challenged._id));

    // ====== (3) State update ::: Update players, ladder and challenge state
    setChallenges( (previousChallenges) => {
      return [...previousChallenges]
    });

    setPlayers( (previousPlayers) => {
      return [...previousPlayers]
    });
  }

  function createChallenge(challengedPlayer) {
    // PARAMS: challengedPlayer ( player object )
    setLoggedInPlayer();

    // - create challenge object
    const challengeToCreate = {
      challengerId: loggedInPlayer._id,
      challengedId: challengedPlayer._id,
      challenger: loggedInPlayer,
      challenged: challengedPlayer,
      playersIds: [loggedInPlayer._id, challengedPlayer._id],
      statusSummaryText : loggedInPlayer.firstName + ' ' + loggedInPlayer.lastName + ' challenged ' + challengedPlayer.firstName + ' ' + challengedPlayer.lastName,
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
      // Send email to challengedId player using html template
  }

  function updatePlayer(id, updatedPlayer) {
    // get the player
    const player = players.find(element => element._id == id);

    // override source on target
    Object.assign(player, updatedPlayer);

    // update state
    setPlayers( (previousPlayers) => {
      return [...previousPlayers]
    });
  }

  function setLoggedInPlayer () {
    loggedInPlayer = players.find( (n) =>  n.firstName == 'Oren');
    return loggedInPlayer
  }

  const getPlayerForId = (idToFind) => {
    let playerFound = players.find(element => element._id == idToFind);
    if (!playerFound) console.log('WARNING: No player found with _id =', idToFind);
    return playerFound
  }

  function getPlayerActiveChallenges (player) {
    return challenges.filter( (c) =>
    (c.challengerId && c.challengerId == player._id  || c.challengedId && c.challengedId == player._id)
    &&
    (c.status == 'invited' || c.status == 'inviteAccepted' || c.status == 'scheduled'));
  }

  return (
    <>
      <QuoteRandomiser />
      { (!dataFetched)
        ? <div className="dataFetchingContainer">
          <img className="dataFetchingImage" src={tennisBallSpinning}></img>
        </div>
        :
        <>
          {/* ---------- MAIN CONTAINER -------------------- */}
          <div className="ladderAndResultsContainer">
            <div className="ladder">
              <Ladder loggedInPlayer={setLoggedInPlayer()} players={players} createChallenge={createChallenge} getPlayerActiveChallenges={getPlayerActiveChallenges}></Ladder>
            </div>
            <div className="playerAndLadderResults">
              <div className="playerChallengeAndResults">
                <PlayerChallengeAndResults players={players} loggedInPlayer={setLoggedInPlayer()} challenges={challenges} updateChallenge={updateChallenge} updatePlayer={updatePlayer}></PlayerChallengeAndResults>
              </div>
              <div className="ladderResults">
                <LadderResults challenges={challenges} loggedInPlayer={setLoggedInPlayer()}></LadderResults>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default App;
