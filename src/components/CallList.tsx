import { useState } from 'react'
import './CallList.css'
import { Call, CallType, Direction } from '@hooks/useCalls'

interface CallListProps {
  calls?: Call[]
  isLoading?: boolean
  error?: Error | null
}

export function CallList({ calls = [], isLoading = false, error = null }: CallListProps) {
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)

  if (isLoading) {
    return <div className="call-list-loading">Loading calls...</div>
  }

  if (error) {
    return <div className="call-list-error">Error loading calls: {error.message}</div>
  }

  if (calls.length === 0) {
    return <div className="call-list-empty">No calls found</div>
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="call-list">
      <h2>Recent Calls</h2>
      <div className="call-list-container">
        {calls.map((call) => (
          <div
            key={call.id}
            className={`call-list-item ${call.is_archived ? 'archived' : ''} ${
              selectedCallId === call.id ? 'selected' : ''
            } ${call.call_type}`} // The enum values already match the CSS class names
            onClick={() => setSelectedCallId(selectedCallId === call.id ? null : call.id)}
          >
            <div className="call-direction">{call.direction === Direction.INBOUND ? 'Incoming' : 'Outgoing'}</div>
            <div className="call-from">{call.from}</div>
            <div className="call-to">to: {call.to}</div>
            <div className="call-via">via: {call.via}</div>
            <div className="call-time">{formatDate(call.created_at)}</div>
            <div className={`call-type ${call.call_type}`}>{call.call_type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
