import React from 'react';
import OpenChallenge from './../components/OpenChallenge';

export default function PlayerChallengeAndResults({loggedInPlayer, challenges, updateChallenge}) {

  //loggedInPlayer = { _id : "5ee24e886eabcbaaa70fbaea" }; // FIX ME - remove this
  console.log('playerChallengerAndResults.js ....challenges:-');
  console.log(challenges)
  // Determine the player's open (if any) challenge - filter the
  // FIX ME - not used.. delete ..const nextChallenge = {status: 'invited', challengerId: 'John Smith', created: Date.now()};
  const nextChallenge = () => {
    // this lookup will be quicker: Get the last member in the Player's challengeIds array and check the status etc.
    const filtered = challenges.filter( (c) =>
      (c.challengerId && c.challengerId == loggedInPlayer._id  || c.challengedId && c.challengedId == loggedInPlayer._id)
      &&
      (c.status == 'invited' || c.status == 'inviteAccepted' || c.status == 'scheduled')
    );
    if (filtered.length> 1) console.log('WARNING: Player has more than one challenge is an open state. There should only be 0..1 per player.');
    return filtered[0]; // return first in array (array should only contain one anyway)
  }

  return (
    <>
      <div className="title">
        <h3>My next game</h3>
      </div>
      <div className="nextChallenge">
        <OpenChallenge loggedInPlayer={loggedInPlayer} nextChallenge={nextChallenge()} updateChallenge={updateChallenge} />
      </div>
      <div className="myResultsLink">
        <h3>My results</h3>
      </div>
    </>
  )
}
