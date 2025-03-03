import { CallList } from '@components/CallList'
import { CallWithContact } from '@hooks/useCalls'
import { useEffect, useState } from 'react'
import './TabContent.css'

// Tab content component
export interface TabContentProps {
  activeTab: string
  calls?: CallWithContact[]
  isLoading?: boolean
  error?: Error | null
  onArchiveCall?: (callId: string) => void
  onArchiveAllCalls?: () => void
  onCallSelect?: (callId: string) => void
}

export function TabContent({
  activeTab,
  calls,
  isLoading,
  error,
  onArchiveCall,
  onArchiveAllCalls,
  onCallSelect,
}: TabContentProps) {
  // State to trigger animation
  const [animateKey, setAnimateKey] = useState(0)

  // Update the animation key when tab changes to trigger animation
  useEffect(() => {
    setAnimateKey((prev) => prev + 1)
  }, [activeTab])

  if (activeTab === 'tune') {
    return (
      <div
        key={`tune-${animateKey}`}
        className="coming-soon-container tune-container"
      >
        <div className="coming-soon-message">
          <h3>We're excited to announce new tunings!</h3>
          <p>This feature is coming soon—stay tuned for updates!</p>
        </div>
      </div>
    )
  }

  return (
    <div
      key={`tab-${activeTab}-${animateKey}`}
      className="tab-content-enter tab-content-container"
    >
      <CallList
        calls={calls}
        isLoading={isLoading}
        error={error}
        isArchived={activeTab === 'archived'}
        onArchiveCall={onArchiveCall}
        onArchiveAllCalls={onArchiveAllCalls}
        onCallSelect={onCallSelect}
      />
    </div>
  )
}
