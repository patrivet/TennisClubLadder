import React from 'react'
import moment from 'moment';

export default function Challenge({challenge}) {
  const longDate = moment(challenge.lastUpdated).format("h:mm a - MMMM Do, YYYY");
  const dayOfMonth = moment(challenge.lastUpdated).format("Do");
  const month = moment(challenge.lastUpdated).format("MMM");
  const time = moment(challenge.lastUpdated).format("HH:mm");
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
