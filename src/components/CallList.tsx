import { useState, useMemo } from 'react'
import './CallList.css'
import { CallWithContact, CallType, Direction } from '@hooks/useCalls'
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
  onCallSelect?: (callId: string) => void
}

export function CallList({
  calls = [],
  isLoading = false,
  error = null,
  isArchived = false,
  onArchiveCall,
  onArchiveAllCalls,
  onCallSelect,
}: CallListProps) {
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)

  const handleCallSelect = (callId: string) => {
    setSelectedCallId(selectedCallId === callId ? null : callId)
    if (onCallSelect) {
      onCallSelect(callId)
    }
  }

  const filteredCalls = calls.filter((call) => call.is_archived === isArchived)

  // Group calls by date and count missed calls by the same person on the same day
  const groupedCalls = useMemo(() => {
    const groups: Record<string, CallWithContact[]> = {}
    const missedCallCounts: Record<string, Record<string, number>> = {} // date -> callerId -> count

    // Sort calls by date (newest first)
    const sortedCalls = [...filteredCalls].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    // First pass: count missed inbound calls by caller and date
    sortedCalls.forEach((call) => {
      const dateOnly = call.created_at.split('T')[0]
      const isInboundMissed =
        call.direction === Direction.INBOUND && call.call_type === CallType.MISSED

      if (isInboundMissed) {
        const callerId = String(call.from) // Use the caller's ID as string

        if (!missedCallCounts[dateOnly]) {
          missedCallCounts[dateOnly] = {}
        }

        if (!missedCallCounts[dateOnly][callerId]) {
          missedCallCounts[dateOnly][callerId] = 0
        }

        missedCallCounts[dateOnly][callerId]++
      }
    })

    // Second pass: group calls by date and filter out duplicate missed calls
    const processedCallerIds: Record<string, Set<string>> = {}

    sortedCalls.forEach((call) => {
      const dateOnly = call.created_at.split('T')[0]
      const isInboundMissed =
        call.direction === Direction.INBOUND && call.call_type === CallType.MISSED
      const callerId = String(call.from) // Use the caller's ID as string

      if (!groups[dateOnly]) {
        groups[dateOnly] = []
        processedCallerIds[dateOnly] = new Set()
      }

      // Skip duplicates of inbound missed calls from the same caller on the same day
      if (isInboundMissed) {
        if (processedCallerIds[dateOnly].has(callerId)) {
          return // Skip this call as we already processed one from this caller
        }
        processedCallerIds[dateOnly].add(callerId)
      }

      groups[dateOnly].push(call)
    })

    return { groups, missedCallCounts }
  }, [filteredCalls])

  const { groups, missedCallCounts } = groupedCalls

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
        {Object.entries(groups).map(([date, callsForDate]) => (
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
                missedCallCount={
                  call.direction === Direction.INBOUND &&
                  call.call_type === CallType.MISSED &&
                  missedCallCounts[date]?.[String(call.from)]
                    ? missedCallCounts[date][String(call.from)]
                    : 0
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
