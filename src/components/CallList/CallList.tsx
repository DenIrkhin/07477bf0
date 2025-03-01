import { useState } from 'react'
import './CallList.css'

type Call = {
  id: string
  from: string
  to: string
  duration: number
  is_archived: boolean
  call_type: 'missed' | 'answered' | 'voicemail'
  created_at: string
  direction: 'inbound' | 'outbound'
}

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

  return (
    <div className="call-list-container">
      <h2>Call History</h2>
      <ul className="call-list">
        {calls.map((call) => (
          <li 
            key={call.id} 
            className={`call-item ${call.call_type} ${selectedCallId === call.id ? 'selected' : ''}`}
            onClick={() => setSelectedCallId(call.id === selectedCallId ? null : call.id)}
          >
            <div className="call-direction">{call.direction === 'inbound' ? 'Incoming' : 'Outgoing'}</div>
            <div className="call-info">
              <span className="call-from">{call.from}</span>
              <span className="call-to">to {call.to}</span>
            </div>
            <div className="call-time">
              {new Date(call.created_at).toLocaleString()}
            </div>
            <div className="call-duration">
              {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
            </div>
            {call.is_archived && <div className="call-archived">Archived</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
