import React from 'react';
import OpenChallenge from './../components/OpenChallenge';

export default function PlayerChallengeAndResults({players, loggedInPlayer, challenges, updateChallenge, updatePlayer}) {

  // Determine the player's open (if any) challenge - filter the
  function getNextChallenge () {
    // handle no logged in user.
    if (!loggedInPlayer) return null;

    // this lookup will be quicker: Get the last member in the Player's challengeIds array and check the status etc.
    const filtered = challenges.filter( (c) =>
      (c.challengerId && c.challengerId == loggedInPlayer._id  || c.challengedId && c.challengedId == loggedInPlayer._id)
      &&
      (c.status == 'invited' || c.status == 'inviteAccepted' || c.status == 'scheduled')
    );
    // console.log('INFO: pC&R.js: found =' + filtered.length + ' open Cs for player =' + loggedInPlayer.firstName);

    // if (filtered.length> 1) console.log('WARNING: Player has more than one challenge is an open state. There should only be 0..1 per player.');
    return filtered[filtered.length -1]; // return last - until there's only 1: [correction!] return first in array (array should only contain one anyway)
  }

  return (
    <>
      <div className="title">
        <h3>My next game</h3>
      </div>
      <div className="nextChallenge">
        <OpenChallenge players={players} loggedInPlayer={loggedInPlayer} nextChallenge={getNextChallenge()} updateChallenge={updateChallenge} updatePlayer={updatePlayer} />
      </div>
      <div className="myResultsLink">
        <h3></h3>
      </div>
    </>
  )
}
