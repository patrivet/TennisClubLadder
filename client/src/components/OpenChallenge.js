import React, { useRef, useState } from 'react'
import Emoji from './Emoij.js';

export default function OpenChallenge({nextChallenge, changeChallengeStatus}) {
  const [winner, setWinner] = useState('');
  const [commentary, setCommentary] = useState('');

  /* function to change challengeStatus - passed in from props ^ */
  const handleChallengeChange = (inStatus) => {
    console.log("INFO: openChallenge.js::: running handleChallengeChange");
    changeChallengeStatus(nextChallenge, inStatus);
  }

  /* intented to be used by select:case statement inside render() - to replace warning from using current implementation */
  function getChallengeStatus () {
    if (nextChallenge.status == 'invited') {
      return (nextChallenge.creator == 'me') ? 'invitedByMe' : 'invitedByChallenger';
    } else {
      return nextChallenge.status
    }
  }

  function handleChallengeResult(event) {
    event.preventDefault();
    console.log('handleChallengeResult....().....', event);
    // 1) Handle updating the Challenge's result:
    // (a) Set the winner to challenge.creator if winner=yes; && session.name == challenge.creator  FIX ME -need login for this.
    //  (logged in user set from the login time - to a context shared prop, or a prop that will be passed down.)
    // (b) Commentary.

    // 2) Update the Challenge's status - so this area re-paints
    // a) challenge.status = complete.
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
        || (nextChallenge.status == 'invited' && nextChallenge.creator == 'me') &&
            <div>
              <p>Challenged {nextChallenge.challenged}</p>
              <p>on {nextChallenge.created}</p>
              <p>Awaiting response...</p>
            </div>

        /* Invited (by a challenger) */
        || (nextChallenge.status == 'invited' && nextChallenge.creator != 'me') &&
          <div>
            <p>Challenged by {nextChallenge.creator}</p>
            <p>on {nextChallenge.created}</p>
            <button className="accept" onClick={() => handleChallengeChange('inviteAccepted')}>Accept <Emoji symbol="🎾"/></button>
            <button className="decline" onClick={() => handleChallengeChange('inviteDeclined')}>Decline <Emoji symbol="⛔️"/></button>
          </div>

        /* Invite accepted - Result can be entered */
        || nextChallenge.status == 'inviteAccepted' &&
        <div className="resultFormContainer">
          <form className="form" onSubmit={handleChallengeResult}>
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
