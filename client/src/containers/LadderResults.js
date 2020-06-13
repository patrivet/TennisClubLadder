import React from 'react'
import Challenge from '../components/Challenge'

export default function LadderResults({challenges}) {

  return (
    /* Return last 20? challenges in status invited, complete or inviteAccepted, sort descending lastUpdated */
    <>
      <div className="title">
        <h3>Latest ladder results</h3>
      </div>
      <div className="latestResults">
        {challenges
        .filter( (c) => c.status == 'invited' || c.status == 'inviteAccepted' || c.status == 'complete')
        .sort( (a, b) =>  a.lastUpdated > b.lastUpdated ? 1 : -1 )
        .slice(10, 15)
        .map(challenge => {
          return <Challenge key={challenge._id} challenge={challenge} />
        })}
      </div>
      <div className="resultsLink">
        <h3>All ladder results</h3>
      </div>
    </>
  )
}
