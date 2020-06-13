import React from 'react';
import Emoji from './Emoij.js';

export default function LadderPlayer({player}) {
  const playerImgPath = (player.imagePath) ? player.imagePath : `/icons8-person-64.png`;

  return (
    /* Ladder Table Row definition -------- -------- */
    <tr className="tableRow">
      <td>{player.position}</td>
      <td><img alt={player.firstName} src={playerImgPath} className="playerImage"></img></td>
      <td>{player.firstName + " " + player.lastName}</td>
      <td>{`${player.numWins}`}</td>
      <td>{`${player.numLosses}`}</td>
      <td>WWW</td>
      <td><Emoji symbol="👆🏼"/></td>
      <td><Emoji symbol="🎾"/></td>

    </tr>
  )
}