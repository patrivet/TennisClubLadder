import React from 'react';
import OpenChallenge from './../components/OpenChallenge';

export default function PlayerChallengeAndResults({players, loggedInPlayer, challenges, updateChallenge, updatePlayer}) {

  // Determine the player's open (if any) challenge.
  function getNextChallenge () {
    // handle no logged in user.
    if (!loggedInPlayer) return null;

    // Get the player's open challenge (if there is one).
    const filtered = challenges.filter( (c) =>
      ((c.challengerId && c.challengerId === loggedInPlayer._id)  || (c.challengedId && c.challengedId === loggedInPlayer._id))
      &&
      ((c.status === 'invited' )|| (c.status === 'inviteAccepted') || (c.status === 'scheduled'))
    );

    if (filtered.length> 1) console.log('WARNING: Player has more than one challenge is an open state. There should only be 0..1 per player.');
    // Incase there are more than one- return the last in filtered
    return filtered[filtered.length -1];
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
      </div>
    </>
  )
}
