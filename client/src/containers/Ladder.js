import React from 'react';
import LadderPlayer from './../components/LadderPlayer';
import Emoji from './../components/Emoij.js';

export default function Ladder({players, loggedInPlayer, createChallenge}) {
  loggedInPlayer = { _id : "5ee24e886eabcbaaa70fbaea" }; // FIX ME - remove this

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
            .map(player => {
              return <LadderPlayer loggedInPlayer={loggedInPlayer} key={player._id} player={player} createChallenge={createChallenge} />
          })}
        </tbody>
      </table>
    </>
  )
}