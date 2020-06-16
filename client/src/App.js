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
import tennisBallSpinning from './imgs/tennis-ball-spinning.gif'
function App() {
  const [ladder, setLadder] = useState({});
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  let loggedInPlayer = {}; // FIX ME - replace with real session logged in.

  useEffect( () => {
    // Get all DB data. FIX ME: move this to another component & make more DRY.
    console.log('INFO: app.js:: useEffect: fetching DB data..');

    // TESTING promise all - June 16th:15:34
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
    return;



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
        challenges.forEach( c => {
          c.lastUpdated = new Date(c.lastUpdated);
          c.created = new Date(c.created);
        });
        setChallenges(challenges);
        fixUpPlayerObjects()
      })
      .then( ()=> {
        console.log('INFO: useEffect (1).....Cs challenges length =' + challenges.length + ' players length =' + players.length)
      })
      .catch( err => { console.log(`ERROR App.js:: useEffect() getChallenges Error =`); console.log(err) } );

  }, [])

  useEffect( () => {
    // console.log('INFO: useEffect() (2).....Cs challenges length =' + challenges.length + ' players length =' + players.length);
    fixUpPlayerObjects();
  }, [challenges])


  // FIX ME- fixUpPlayerObjects() isn't need anymore? Check and remove: Jun 16: 12:19
  function fixUpPlayerObjects() {
    // console.log('INFO: fixUpPlayerObjects ......Cs length =' + challenges.length + ' players length =' + players.length)
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const pId = challenge.challengerId;
      if (pId) {
        // get the player object from players with _id matching challenger_id
        const p = getPlayerForId(pId);
        if (!p) {console.log('WARNING: !! Challenge index =' + i + 'has no challengerId');}
        else {
          challenge.challenger = null;
          challenge.challenger = p;
          // console.log('INFO: Challenge challenger object set from players array.')
        }
      } else {
        console.log('WARNING: !! Challenge index =' + i + 'has no challengerId');
      }
    }
  }

  // Update entire challenge Object
  function updateChallenge(challenge) {
    // FIX ME - do this elsewhere- own Challenge component?
    setFakeLoggedInPlayer();

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
    setFakeLoggedInPlayer();

    // - create challenge object
    const challengeToCreate = {
      challengerId: loggedInPlayer._id,
      challengedId: challengedPlayer._id,
      challenger: loggedInPlayer,
      challenged: challengedPlayer,
      playersIds: [loggedInPlayer._id, challengedPlayer._id],
      statusSummaryText : loggedInPlayer.firstName + ' ' + loggedInPlayer.lastName + ' challenged ' + challengedPlayer.firstName + ' ' + challengedPlayer.lastName,
      // Created and lastUpdated are init in the backend.
    }

    //  TEMP TESTING IF OBJECTS ARE EQUAL - FIX ME: can be removed.
    // if (challengeToCreate) {
    //   let c1 = challengeToCreate;
    //   let p1 = players[0];
    //   console.log(`(app.js) Challenge 1 has challenger =${c1.challenger.firstName}`);
    //   console.log(`(app.js) First player in players array =${p1.firstName}`);
    //   console.log(`(app.js) 2 player objects are equal =`);
    //   console.log(c1.challenger === p1);
    // }

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

        // // TEMP FIX ME - can remove at the end
        // // USED TO  BULK SET DATA on PLAYERS
        // players.forEach( (p) => {
        //   p.trend = 0;
        //   ApiService.putPlayer(p);
        // })

      })
      .catch( err => {
        console.log(`ERROR App.js:: createChallenge() Error =`); console.log(err)
      });

    // FIX ME Send email to challengedId player using html template
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
    console.log('INFO: app.js(update player) players array =' );
    console.log(players);
  }

  function setFakeLoggedInPlayer () {
    // FIX ME - delete his function and all callers.

    // store 2 players in array - pop & return
    // plyrs = players.filter( p => p.firstName == 'Tyler' || p.firstName == 'Oren' )
    // console.log(players.length);
    // console.log(plyrs);
    // return plyrs.pop();

    loggedInPlayer = players.find( (n) =>  n.firstName == 'Elton');
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
      <Header />
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
              <Ladder loggedInPlayer={setFakeLoggedInPlayer()} players={players} createChallenge={createChallenge} getPlayerActiveChallenges={getPlayerActiveChallenges}></Ladder>
            </div>
            <div className="playerAndLadderResults">
              <div className="playerChallengeAndResults">
                <PlayerChallengeAndResults players={players} loggedInPlayer={setFakeLoggedInPlayer()} challenges={challenges} updateChallenge={updateChallenge} updatePlayer={updatePlayer}></PlayerChallengeAndResults>
              </div>
              <div className="ladderResults">
                <LadderResults challenges={challenges} loggedInPlayer={setFakeLoggedInPlayer()}></LadderResults>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default App;
