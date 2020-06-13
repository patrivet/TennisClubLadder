import React, { useRef, useState } from 'react'
import Emoji from './Emoij.js';

export default function OpenChallenge({loggedInPlayer, nextChallenge, updateChallenge}) {
  const [winner, setWinner] = useState('');
  const [commentary, setCommentary] = useState('');
  //loggedInPlayer = { _id : "5ee24e886eabcbaaa70fbaea" }; // FIX ME - remove this

  const handleChallengeChange = (inStatus) => {
    console.log("INFO: openChallenge.js::: running handleChallengeChange");
    // Set the new status on the challenge object and call function to write changes to DB and update this.state.
    nextChallenge.status = inStatus;

    // Update status text
    if (inStatus == 'inviteAccepted') {
      nextChallenge.statusSummaryText = nextChallenge.challenged.firstName + ' ' + nextChallenge.winner.lastName + ' accepted challenge of: ' + nextChallenge.challenger.firstName + ' ' + nextChallenge.challenger.lastName;
    } else if (inStatus == 'inviteDeclined') {
      nextChallenge.statusSummaryText = nextChallenge.challenged.firstName + ' ' + nextChallenge.winner.lastName + ' declined challenge of: ' + nextChallenge.challenger.firstName + ' ' + nextChallenge.challenger.lastName;
    }

    updateChallenge(nextChallenge);
  }

  /* intented to be used by select:case statement inside render() - to replace warning from using current implementation */
  function getChallengeStatus () {
    if (nextChallenge.status == 'invited') {
      return (nextChallenge.challengerId == loggedInPlayer._id) ? 'invitedByMe' : 'invitedByChallenger';
    } else {
      return nextChallenge.status
    }
  }

  function handleResult(event) {
    event.preventDefault();
    console.log('handleResult....().....', event);
    // set status
    nextChallenge.status = 'complete';

    // set winner and loser
    const challenger = nextChallenge.challenger;
    const challenged = nextChallenge.challenged;
    if (loggedInPlayer._id == nextChallenge.challengerId) {
      // The challenger has submitted the result.
      if (winner == 'yes') {
        nextChallenge.winner = challenger;
        nextChallenge.loser = challenged;
      } else {
        nextChallenge.winner = challenged;
        nextChallenge.loser = challenger;
      }
    } else {
      // The challenged player has submitted the result.
      if (winner == 'yes') {
        nextChallenge.winner = challenged;
        nextChallenge.loser = challenger;
      } else {
        nextChallenge.winner = challenger;
        nextChallenge.loser = challenged;
      }
    }
    // Set commentary
    nextChallenge.commentary = commentary;

    // set status text
    nextChallenge.statusSummaryText = nextChallenge.winner.firstName + ' ' + nextChallenge.winner.lastName + ' bt ' + nextChallenge.loser.firstName + ' ' + nextChallenge.loser.lastName;

    updateChallenge(nextChallenge);
  }

  function handleWinnerChange(event) {
    setWinner(event.target.value);
  }

  function handleCommentaryChange(event) {
    setCommentary(event.target.value);
  }

  return (
    <>
      {
        (!nextChallenge) &&
        <div>No challenge currently set. Pick a new challenger!</div>

        /* Invited (Player is the "challenger") */
        || (nextChallenge.status == 'invited' && nextChallenge.challengerId == loggedInPlayer._id) &&
            <div>
              <p>Challenged {nextChallenge.challengedId}</p>
              <p>on {nextChallenge.created}</p>
              <p>Awaiting response...</p>
            </div>

        /* Invited (by a challenger) */
        || (nextChallenge.status == 'invited' && nextChallenge.challengerId != loggedInPlayer._id) &&
          <div>
            <p>Challenged by {nextChallenge.challenger.firstName + nextChallenge.challenger.lastName}</p>
            <p>on {nextChallenge.created}</p>
            <button className="accept" onClick={() => handleChallengeChange('inviteAccepted')}>Accept <Emoji symbol="🎾"/></button>
            <button className="decline" onClick={() => handleChallengeChange('inviteDeclined')}>Decline <Emoji symbol="⛔️"/></button>
          </div>

        /* Invite accepted - Result can be entered */
        || nextChallenge.status == 'inviteAccepted' &&
        <div className="resultFormContainer">
          <form className="form" onSubmit={handleResult}>
            <p className="formLabel">Did you win?</p>
            <input type="radio" id="yes" name="winner" value="yes" onChange={(event) => handleWinnerChange(event)} />
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="winner" value="no" onChange={(event) => handleWinnerChange(event)}/>
            <label htmlFor="no">No</label>
            <p className="formLabel">Commentary</p>
            <textarea name="commentary" rows="3" cols="30" onChange={(event) => handleCommentaryChange(event)} placeholder="optional commentary"></textarea>
            <br></br>
            <button className="formButton" type="submit" width="auto">Submit result</button>
          </form>
        </div>
      }
    </>
  )
}
