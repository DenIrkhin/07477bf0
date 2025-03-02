import { CallList } from '@components/CallList'
import { CallWithContact } from '@hooks/useCalls'
import './TabContent.css'

// Tab content component
export interface TabContentProps {
  activeTab: string
  calls?: CallWithContact[]
  isLoading?: boolean
  error?: Error | null
  onArchiveCall?: (callId: string) => void
  onArchiveAllCalls?: () => void
}

export function TabContent({
  activeTab,
  calls,
  isLoading,
  error,
  onArchiveCall,
  onArchiveAllCalls,
}: TabContentProps) {
  if (activeTab === 'tune') {
    return (
      <div className="coming-soon-container">
        <div className="coming-soon-message">
          <h3>We're excited to announce new tunings!</h3>
          <p>This feature is coming soon—stay tuned for updates!</p>
        </div>
      </div>
    )
  }

  return (
    <CallList
      calls={calls}
      isLoading={isLoading}
      error={error}
      isArchived={activeTab === 'archived'}
      onArchiveCall={onArchiveCall}
      onArchiveAllCalls={onArchiveAllCalls}
    />
  )
}
