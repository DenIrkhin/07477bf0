import { useState } from 'react'
import './CallList.css'
import { CallWithContact, Direction } from '@hooks/useCalls'

interface CallListProps {
  calls?: CallWithContact[]
  isLoading?: boolean
  error?: Error | null
  isArchived?: boolean
}

export function CallList({
  calls = [],
  isLoading = false,
  error = null,
  isArchived = false,
}: CallListProps) {
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)

  if (isLoading) {
    return <div className="call-list-loading">Loading calls...</div>
  }

  if (error) {
    return <div className="call-list-error">Error loading calls: {error.message}</div>
  }

  // Filter calls based on isArchived prop
  const filteredCalls = calls.filter((call) => call.is_archived === isArchived)

  if (filteredCalls.length === 0) {
    return (
      <div className="call-list-empty">No {isArchived ? 'archived' : 'active'} calls found</div>
    )
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="call-list">
      <div className="call-list-container">
        {filteredCalls.map((call) => (
          <div
            key={call.id}
            className={`call-list-item ${call.is_archived ? 'archived' : ''} ${
              selectedCallId === call.id ? 'selected' : ''
            } ${call.call_type}`} // The enum values already match the CSS class names
            onClick={() => setSelectedCallId(selectedCallId === call.id ? null : call.id)}
          >
            <div className="call-direction">
              {call.direction === Direction.INBOUND ? 'Incoming' : 'Outgoing'}
            </div>
            <div className="call-from">{call.fromContact?.name || call.from}</div>
            <div className="call-to">to: {call.toContact?.name || call.to}</div>
            <div className="call-via">via: {call.via}</div>
            <div className="call-time">{formatDate(call.created_at)}</div>
            <div className={`call-type ${call.call_type}`}>{call.call_type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
