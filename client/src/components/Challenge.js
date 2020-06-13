import React from 'react'
import moment from 'moment';

export default function Challenge({challenge}) {
  const longDate = moment(challenge.date).format("h:mm a - MMMM Do, YYYY");
  const dayOfMonth = moment(challenge.date).format("Do");
  const month = moment(challenge.date).format("MMM");

  const getStatusIcon = () => {
    switch (challenge.status) {
      case 'invited':
        return '📮';
      case 'invitedAccepted':
        return '🤝';
      case 'complete':
        return '🏁';
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
      </div>
    </>
  )
}
