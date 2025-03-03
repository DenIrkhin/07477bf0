import React from 'react'
import './CallItem.css'
import { CallWithContact, CallType, Direction } from '@hooks/useCalls'
import { CURRENT_USER_ID } from '@content/crm'
import archiveIcon from '@assets/icons/Dark/Color=Black, Type=business-bag.svg'
import unarchiveIcon from '@assets/icons/Dark/Color=Black, Type=folder.svg'
import greenCallIcon from '@assets/icons/Green/Color=Green, Type=call_2.svg'
import callOutgoingGreenIcon from '@assets/icons/call-outgoing.svg'
import callMissedIcon from '@assets/icons/call-missed.svg'
import callOutgoingMissedIcon from '@assets/icons/call-outgoing-missed.svg'

interface CallItemProps {
  call: CallWithContact
  isSelected: boolean
  onSelect: (callId: string) => void
  onArchive?: (callId: string) => void
  missedCallCount?: number
}

export const CallItem: React.FC<CallItemProps> = ({ call, isSelected, onSelect, onArchive, missedCallCount = 0 }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes} ${period}`
  }

  const formatPhoneNumber = (phoneNumber?: number) => {
    if (!phoneNumber) return ''
    const numStr = phoneNumber.toString()
    return `+${numStr.substring(0, 2)} ${numStr.substring(2, 4)} ${numStr.substring(4, 6)} ${numStr.substring(6, 8)} ${numStr.substring(8)}`
  }

  // Get the person who is not the current user
  const otherPerson = call.fromContact?.id === CURRENT_USER_ID ? call.toContact : call.fromContact
  const personName =
    otherPerson?.name || formatPhoneNumber(call.from !== CURRENT_USER_ID ? call.from : call.to)

  return (
    <div
      className={`call-item ${call.is_archived ? 'archived' : ''} ${isSelected ? 'selected' : ''} ${call.call_type}`}
      onClick={() => onSelect(call.id)}
    >
      <div
        className={`call-icon ${call.direction === Direction.INBOUND ? 'inbound' : 'outbound'} ${call.call_type}`}
      >
        {call.direction === Direction.INBOUND && call.call_type === CallType.ANSWERED ? (
          <img
            src={greenCallIcon}
            alt="Inbound Call"
            width="22"
            height="22"
          />
        ) : call.direction === Direction.OUTBOUND && call.call_type === CallType.ANSWERED ? (
          <img
            src={callOutgoingGreenIcon}
            alt="Outbound Call"
            width="22"
            height="22"
          />
        ) : call.direction === Direction.INBOUND && call.call_type === CallType.MISSED ? (
          <>
            <img
              src={callMissedIcon}
              alt="Missed Call"
              width="22"
              height="22"
            />
            {missedCallCount > 1 && <div className="call-badge">{missedCallCount}</div>}
          </>
        ) : call.direction === Direction.OUTBOUND && call.call_type === CallType.MISSED ? (
          <img
            src={callOutgoingMissedIcon}
            alt="Outbound Missed Call"
            width="22"
            height="22"
          />
        ) : null}
      </div>
      <div className="call-content">
        <div className="call-person">{personName}</div>
        {call.via && (
          <div className="call-details">
            {call.call_type === 'answered'
              ? call.direction === Direction.INBOUND
                ? 'called you'
                : 'called'
              : `tried to call ${call.direction === Direction.INBOUND ? 'you' : otherPerson?.name || 'unknown'}`}
          </div>
        )}
      </div>
      <div className="call-time-container">
        <div className="call-time">{formatTime(call.created_at)}</div>
        <div className="call-status">{call.call_type.toUpperCase()}</div>
      </div>
      {!call.is_archived && onArchive && (
        <button
          className="call-archive-button"
          onClick={(e) => {
            e.stopPropagation() // Prevent triggering the parent onClick
            onArchive(call.id)
          }}
        >
          <img
            src={archiveIcon}
            alt="Archive"
            className="archive-icon"
          />
        </button>
      )}
      {call.is_archived && onArchive && (
        <button
          className="call-archive-button"
          onClick={(e) => {
            e.stopPropagation() // Prevent triggering the parent onClick
            onArchive(call.id)
          }}
        >
          <img
            src={unarchiveIcon}
            alt="Unarchive"
            className="archive-icon"
          />
        </button>
      )}
    </div>
  )
}
