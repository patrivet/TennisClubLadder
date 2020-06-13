import React from 'react'
import OpenChallenge from './../components/OpenChallenge'
export default function PlayerChallengeAndResults({challenges, changeChallengeStatus}) {

  // Determine the player's open (if any) challenge
  // if there is a challenge - get it's status:::::  and store if player is the challenger or challenged!
    //  invited (as challenger or challenged)
    //  inviteAccepted  || inviteDeclined  ||  inviteExpired
    //      |
    //  (scheduled) (optional state)
    //      |
    //  complete  (result entered)  ||  expired  (result not entered after 2 weeks)

    // CASE statement for 8 DIVs above. (7 statuses and no challenge booked.)

  // const challenger = true;
  const nextChallenge = {status: 'invited', creator: 'John Smith', created: Date.now()};
  // let me = null; // logged in player
  // const isChallenger = nextChallenge/*.creator*/ == me // ?? ->session.username;
  // const nextChallengeStatus = 'inviteAccepted';

  return (
    <>
      <div className="title">
        <h3>My next game</h3>
      </div>
      <div className="nextChallenge">
        <OpenChallenge nextChallenge={nextChallenge} changeChallengeStatus={changeChallengeStatus} />
      </div>
      <div className="myResultsLink">
        <h3>My results</h3>
      </div>
    </>
  )
}
