import React from 'react';
import LadderPlayer from './../components/LadderPlayer';
import Emoji from './../components/Emoij.js';

export default function Ladder({players, loggedInPlayer, createChallenge, getPlayerActiveChallenges}) {
  return (
    /* Ladder Table with headers -------- -------- */
    <>
      <table className="ladderTable">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>W</th>
            <th>L</th>
            <th>Form</th>
            <th><Emoji symbol="↕️"/></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players
            .sort( (a, b) => (a.position > b.position) ? 1 : -1 )
            .map(player => {
              if (player == loggedInPlayer) return <LadderPlayer classFlag="currentPlayer" loggedInPlayer={loggedInPlayer} key={player._id} player={player} createChallenge={createChallenge} getPlayerActiveChallenges={getPlayerActiveChallenges} />
              else return <LadderPlayer classFlag="noCurrentPlayer" loggedInPlayer={loggedInPlayer} key={player._id} player={player} createChallenge={createChallenge} getPlayerActiveChallenges={getPlayerActiveChallenges} />
          })}
        </tbody>
      </table>
    </>
  )
}