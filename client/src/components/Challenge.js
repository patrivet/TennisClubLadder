import React from 'react'
import moment from 'moment';

export default function Challenge({challenge}) {
  const dayOfMonth = moment(challenge.lastUpdated).format("Do");
  const month = moment(challenge.lastUpdated).format("MMM");
  const getStatusIcon = () => {
    switch (challenge.status) {
      case 'invited':
        return '📮';
      case 'inviteAccepted':
        return '🤝';
      case 'inviteDeclined':
        return '🚫';
      case 'complete':
        return '✅';
      default: console.error(`Challenge: getStatusIcon(): ${challenge.status} doesn't have an emoij or is an incorrect status.`);
    }
  }

  return (
    <>
      <div className="challengeContainer">
        <div className="icon">
          {getStatusIcon()}
        </div>
        <div className="lastUpdated">
          {dayOfMonth + ' ' + month}
        </div>
        <div className="statusSummaryText">
          {challenge.statusSummaryText}
        </div>
        <div className="commentaryText">
        </div>
      </div>
    </>
  )
}
