import React, { useState } from 'react'
import Challenge from '../components/Challenge'
import Emoji from './../components/Emoij.js';

export default function LadderResults({challenges, loggedInPlayer}) {
  const [ filterOn, setFilterOn ] = useState(false);
  const statusFlagInit = ['invited', 'inviteAccepted', 'inviteDeclined','complete'] // FIX ME - include all statuses
  const [ statusFlags, setStatusFlags ] = useState(statusFlagInit);

  function getChallengesToShow() {
    if (!filterOn) {
      return challenges.filter( (c) => statusFlags.includes(c.status) );
    } else if (filterOn) {
      return challenges.filter( (c) => statusFlags.includes(c.status) && (c.challengerId == loggedInPlayer._id || c.challengedId == loggedInPlayer._id) );//
    }
  }

  function toggleStatusFlag(statusName) {
    // Finds the object with status and toggles true/false / false/true;
    const foundIndex = statusFlags.indexOf(statusName);
    const statusFlagsCopy = [...statusFlags];
    if (foundIndex != -1) { // remove it
      // Remove the status at foundIndex
      statusFlagsCopy.splice(foundIndex, 1);
      setStatusFlags( statusFlagsCopy )
    }
    else {// indexOf is -1 - add this status
      statusFlagsCopy.push(statusName);
      setStatusFlags( statusFlagsCopy )
    }
  }

  function statusIsSelected (statusName) {
    return (statusFlags.indexOf(statusName) == -1) ? false : true;
  }

  function getIconClasses(statusName) {
    const isSelected = statusFlags.indexOf(statusName) != -1;
    return `filter-${statusName} ${(!isSelected ? 'iconUnselected' : '')}`
  }

  function getTextClasses(filterOpt) {
    return `filter-${filterOpt} ${(filterOn) ? 'textBold' : ''}`
  }

  return (
    /* Return last 20? challenges in status invited, complete or inviteAccepted, sort descending lastUpdated */
    <div className="ladderResultContainer">
      <div className="title">
        <h3>Ladder history</h3>
      </div>
      <div className="filterContainer">
        <p className="filterLabel">Filters:</p>
        <p className={`filter-all ${(!filterOn) ? 'textBold' : ''}`} onClick={() => setFilterOn(false)}>All</p>
        <p className={`filter-mine ${(filterOn) ? 'textBold' : ''}`} onClick={() => setFilterOn(true)}>Mine</p>
        <p className={getIconClasses('invited')} onClick={() => toggleStatusFlag('invited')}><Emoji symbol="📮"/></p>
        <p className={getIconClasses('inviteAccepted')} onClick={() => toggleStatusFlag('inviteAccepted')}><Emoji symbol="🤝"/></p>
        <p className={getIconClasses('inviteDeclined')} onClick={() => toggleStatusFlag('inviteDeclined')}><Emoji symbol="🚫"/></p>
        <p className={getIconClasses('complete')} onClick={() => toggleStatusFlag('complete')}><Emoji symbol="✅"/></p>
      </div>
      <div className="latestResults">
        {getChallengesToShow()
        .sort( (a, b) =>  a.lastUpdated < b.lastUpdated ? 1 : -1 )

        .map(challenge => {
          return <Challenge key={challenge._id} challenge={challenge} />
        })}
      </div>
      <div className="resultsLink">
      </div>
    </div>
  )
}
