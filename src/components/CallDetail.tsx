import { useState, useEffect } from 'react'
import './CallDetail.css'
import { useCallDetails } from '@hooks/useCallDetails'
import { CallWithContact, Direction, CallType } from '@hooks/useCalls'
import { CURRENT_USER_ID } from '@content/crm'
import archiveIcon from '@assets/icons/Dark/Color=Black, Type=business-bag.svg'
import unarchiveIcon from '@assets/icons/Dark/Color=Black, Type=folder.svg'
import greenCallIcon from '@assets/icons/Green/Color=Green, Type=call_2.svg'
import callOutgoingGreenIcon from '@assets/icons/call-outgoing.svg'
import callMissedIcon from '@assets/icons/call-missed.svg'
import callOutgoingMissedIcon from '@assets/icons/call-outgoing-missed.svg'

interface CallDetailProps {
  callId: string | null
  onClose: () => void
  onArchive?: (callId: string) => void
}

export const CallDetail = ({ callId, onClose, onArchive }: CallDetailProps) => {
  const { data: call, isLoading, error } = useCallDetails(callId)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleClose = () => {
    setAnimateOut(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return 'Not answered'
    
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    
    if (minutes === 0) {
      return `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`
    }
    
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`
  }

  const formatPhoneNumber = (phoneNumber?: number) => {
    if (!phoneNumber) return ''
    const numStr = phoneNumber.toString()
    return `+${numStr.substring(0, 2)} ${numStr.substring(2, 4)} ${numStr.substring(4, 6)} ${numStr.substring(6, 8)} ${numStr.substring(8)}`
  }

  const getCallTypeDisplay = (call: CallWithContact) => {
    if (call.call_type === CallType.ANSWERED) {
      return call.direction === Direction.INBOUND ? 'Inbound call' : 'Outbound call'
    } else if (call.call_type === CallType.MISSED) {
      return call.direction === Direction.INBOUND ? 'Missed call' : 'Not answered'
    } else {
      return 'Voicemail'
    }
  }

  if (isLoading) {
    return (
      <div className="call-detail-modal">
        <div className="call-detail-content">
          <div className="call-detail-header">
            <h2 className="call-detail-title">Loading...</h2>
            <button className="call-detail-close" onClick={handleClose}>×</button>
          </div>
          <div className="call-detail-body">
            <div className="loading-spinner">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !call) {
    return (
      <div className="call-detail-modal">
        <div className="call-detail-content">
          <div className="call-detail-header">
            <h2 className="call-detail-title">Error</h2>
            <button className="call-detail-close" onClick={handleClose}>×</button>
          </div>
          <div className="call-detail-body">
            <p>There was an error loading the call details. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  const otherPerson = call.fromContact?.id === CURRENT_USER_ID ? call.toContact : call.fromContact
  const personName = otherPerson?.name || formatPhoneNumber(call.from !== CURRENT_USER_ID ? call.from : call.to)
  const personInitial = personName ? personName.charAt(0).toUpperCase() : '?'

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the overlay, not its children
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div 
      className={`call-detail-modal ${animateOut ? 'animate-out' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="call-detail-content">
        <div className="call-detail-header">
          <h2 className="call-detail-title">Call Details</h2>
          <button className="call-detail-close" onClick={handleClose}>×</button>
        </div>
        <div className="call-detail-body">
          <div className="call-detail-contact">
            <div className="call-detail-avatar">{personInitial}</div>
            <div className="call-detail-contact-info">
              <div className="call-detail-contact-name">{personName}</div>
              <div className="call-detail-contact-number">
                {formatPhoneNumber(call.from !== CURRENT_USER_ID ? call.from : call.to)}
              </div>
            </div>
          </div>

          <div className="call-detail-info">
            <div className="call-detail-section">
              <div className="call-detail-section-title">Call Information</div>
              <div className="call-detail-item">
                <span className="call-detail-item-label">Type</span>
                <span className="call-detail-item-value">{getCallTypeDisplay(call)}</span>
              </div>
              <div className="call-detail-item">
                <span className="call-detail-item-label">Date & Time</span>
                <span className="call-detail-item-value">{formatDate(call.created_at)}</span>
              </div>
              <div className="call-detail-item">
                <span className="call-detail-item-label">Duration</span>
                <span className="call-detail-item-value">{formatDuration(call.duration)}</span>
              </div>
              <div className="call-detail-item">
                <span className="call-detail-item-label">Via</span>
                <span className="call-detail-item-value">{formatPhoneNumber(call.via)}</span>
              </div>
              <div className="call-detail-item">
                <span className="call-detail-item-label">Status</span>
                <span className="call-detail-item-value">
                  {call.is_archived ? 'Archived' : 'Not Archived'}
                </span>
              </div>
            </div>

            <div className="call-detail-actions">
              <button className="call-detail-action-button call-button">
                <img src={greenCallIcon} alt="Call" width="18" height="18" />
                Call Back
              </button>
              {onArchive && (
                <button 
                  className="call-detail-action-button archive-button"
                  onClick={() => {
                    onArchive(call.id)
                    handleClose()
                  }}
                >
                  <img 
                    src={call.is_archived ? unarchiveIcon : archiveIcon} 
                    alt={call.is_archived ? "Unarchive" : "Archive"} 
                    width="18" 
                    height="18" 
                  />
                  {call.is_archived ? 'Unarchive' : 'Archive'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
