import { useState, useMemo } from 'react'
import './CallList.css'
import { CallWithContact } from '@hooks/useCalls'
import { CallItem } from './CallItem'
import { DateItem } from './DateItem'
import archiveIcon from '@assets/icons/Dark/Color=Black, Type=business-bag.svg'

interface CallListProps {
  calls?: CallWithContact[]
  isLoading?: boolean
  error?: Error | null
  isArchived?: boolean
  onArchiveCall?: (callId: string) => void
  onArchiveAllCalls?: () => void
}

export function CallList({
  calls = [],
  isLoading = false,
  error = null,
  isArchived = false,
  onArchiveCall,
  onArchiveAllCalls,
}: CallListProps) {
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)

  // Filter calls based on isArchived prop
  const filteredCalls = calls.filter((call) => call.is_archived === isArchived)

  // Group calls by date
  const groupedCalls = useMemo(() => {
    const groups: Record<string, CallWithContact[]> = {}

    // Sort calls by date (newest first)
    const sortedCalls = [...filteredCalls].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    sortedCalls.forEach((call) => {
      // Extract date part (YYYY-MM-DD) from ISO string
      const dateOnly = call.created_at.split('T')[0]

      if (!groups[dateOnly]) {
        groups[dateOnly] = []
      }

      groups[dateOnly].push(call)
    })

    return groups
  }, [filteredCalls])

  if (isLoading) {
    return <div className="call-list-loading">Loading calls...</div>
  }

  if (error) {
    return <div className="call-list-error">Error loading calls: {error.message}</div>
  }

  if (filteredCalls.length === 0) {
    return (
      <div className="call-list-empty">No {isArchived ? 'archived' : 'active'} calls found</div>
    )
  }

  const handleCallSelect = (callId: string) => {
    setSelectedCallId(selectedCallId === callId ? null : callId)
  }

  const handleArchiveAll = () => {
    if (onArchiveAllCalls) {
      onArchiveAllCalls()
    }
  }

  return (
    <div className="call-list">
      <div className="call-list-container">
        {!isArchived && (
          <div className="archive-all-container">
            <button
              className="archive-all-button"
              onClick={handleArchiveAll}
            >
              <img
                src={archiveIcon}
                alt="Archive"
                className="archive-icon"
              />
              <span>Archive all calls</span>
            </button>
          </div>
        )}
        {Object.entries(groupedCalls).map(([date, callsForDate]) => (
          <div
            key={date}
            className="call-date-group"
          >
            <DateItem date={date} />
            {callsForDate.map((call) => (
              <CallItem
                key={call.id}
                call={call}
                isSelected={selectedCallId === call.id}
                onSelect={handleCallSelect}
                onArchive={onArchiveCall}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
