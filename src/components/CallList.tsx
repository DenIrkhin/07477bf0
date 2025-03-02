import { useState } from 'react'
import './CallList.css'
import { CallWithContact } from '@hooks/useCalls'
import { CallItem } from './CallItem'

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

  const handleCallSelect = (callId: string) => {
    setSelectedCallId(selectedCallId === callId ? null : callId)
  }

  return (
    <div className="call-list">
      <div className="call-list-container">
        {filteredCalls.map((call) => (
          <CallItem
            key={call.id}
            call={call}
            isSelected={selectedCallId === call.id}
            onSelect={handleCallSelect}
          />
        ))}
      </div>
    </div>
  )
}
