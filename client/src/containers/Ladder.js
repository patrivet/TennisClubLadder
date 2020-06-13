import React from 'react';
import LadderPlayer from './../components/LadderPlayer';
import Emoji from './../components/Emoij.js';

export default function Ladder({players}) {
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
              return <LadderPlayer key={player._id} player={player} />
          })}
        </tbody>
      </table>
    </>
  )
}