import React from 'react';
import Emoji from './Emoij.js';

export default function LadderPlayer({classFlag, player, loggedInPlayer, createChallenge, getPlayerActiveChallenges}) {
  // Use the default player image if player doesn't have one uploaded.
  //const playerImgPath = (player.imagePath) ? player.imagePath : `/icons8-person-64.png`;
  const playerImgPath = (player.imagePath) ? player.imagePath : `/user-profile.png`;

  const handleChallengeCreate = () => {
    createChallenge(player);
  }

  function canChallengePlayer() {
    // returns true if the logged in player can challenge this player
    // can't challenge anyone if have an open challenge
    if (getPlayerActiveChallenges(loggedInPlayer).length) return false;

    // Get the logged in player's position
    const loggedInPlayerPos = loggedInPlayer.position;
    const thisPlayerPos = player.position;

    // if player (this context) has a position below (well above numerically) in ladder - they can be challenged
    if (loggedInPlayerPos === thisPlayerPos) {
      return false;
    }
    else if (getPlayerActiveChallenges(player).length) {
      return false;
    }
    else if (thisPlayerPos > loggedInPlayerPos ) { // e.g. 4 > 1 :: 1st is challenging 4th - can challenge.
      return true;
    } else if (thisPlayerPos >= loggedInPlayerPos - 3) {
      return true
    } else {
      return false;
    }
  }

  function getTrendIcon() {
    switch (player.trend) {
      case -1:
        return <Emoji symbol="⬇️"/>
      case 0:
        return <Emoji symbol="↔️"/>
      case 1:
        return <Emoji symbol="⬆️"/>
      default:
        console.error(`LadderPlayer: getTrendIcon() - Incorrect trend enumeration =${player.trend}`)
    }
  }

  return (
    /* Ladder Table Row definition -------- -------- */
    <tr className={"tableRow " + classFlag}>
      <td>{player.position}</td>
      <td><img alt={player.firstName} src={playerImgPath} className="playerImage"></img></td>
      <td>{player.firstName + " " + player.lastName}</td>
      <td>{player.numWins}</td>
      <td>{player.numLosses}</td>
      <td>{player.form}</td>
      <td>{getTrendIcon()}</td>
      {(canChallengePlayer())
        ? <td className="challengeImage" onClick={handleChallengeCreate}><Emoji symbol="🎾"/></td>
        : <td></td>
      }
    </tr>
  )
}