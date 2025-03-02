import React from 'react'
import './CallItem.css'
import { CallWithContact } from '@hooks/useCalls'
import archiveIcon from '@assets/icons/Dark/Color=Black, Type=business-bag.svg'

interface CallItemProps {
  call: CallWithContact
  isSelected: boolean
  onSelect: (callId: string) => void
  onArchive?: (callId: string) => void
}

export const CallItem: React.FC<CallItemProps> = ({ call, isSelected, onSelect, onArchive }) => {
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
  const otherPerson = call.fromContact?.id === 2 ? call.toContact : call.fromContact
  const personName = otherPerson?.name || formatPhoneNumber(call.from !== 2 ? call.from : call.to)

  return (
    <div
      className={`call-item ${call.is_archived ? 'archived' : ''} ${isSelected ? 'selected' : ''} ${call.call_type}`}
      onClick={() => onSelect(call.id)}
    >
      <div
        className={`call-icon ${call.direction === 'inbound' ? 'incoming' : 'outgoing'} ${call.call_type}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {call.direction === 'inbound' ? (
            <path
              d="M12 4L4 12M4 4L12 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 8H12M12 8L8 4M12 8L8 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>
      <div className="call-content">
        <div className="call-person">{personName}</div>
        {call.via && (
          <div className="call-details">
            tried to call on {call.direction === 'inbound' ? 'you' : otherPerson?.name || 'unknown'}
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
            e.stopPropagation(); // Prevent triggering the parent onClick
            onArchive(call.id);
          }}
        >
          <img src={archiveIcon} alt="Archive" className="archive-icon" />
        </button>
      )}
    </div>
  )
}
