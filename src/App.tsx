import './App.css'
import { useState, useMemo } from 'react'
import { useCalls, CallType, CallWithContact } from '@hooks/useCalls'
import dataIcon from '@assets/icons/Dark/Color=Black, Type=data.svg'
import { Header } from '@components/Header'
import { HeaderTabs, Tab } from '@components/HeaderTabs'
import { BottomAppBar } from '@components/BottomAppBar'
import { TabContent } from '@components/TabContent'
import { CallDetail } from '@components/CallDetail'

export function App() {
  const { data: calls, isLoading, error, archiveCall, archiveAllCalls } = useCalls()
  const [activeTab, setActiveTab] = useState<Tab['id']>('inbox')
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)
  const [viewState, setViewState] = useState<'list' | 'detail'>('list')
  const [bottomNavActive, setBottomNavActive] = useState<
    'phone' | 'profile' | 'dialpad' | 'settings' | 'status'
  >('phone')

  const handleCallSelect = (callId: string) => {
    setSelectedCallId(callId)
    setViewState('detail')
  }

  const handleBackToList = () => {
    setViewState('list')
    setSelectedCallId(null)
  }

  // Calculate missed calls count
  const missedCallsCount = useMemo(() => {
    if (!calls) return 0
    return calls.filter(
      (call: CallWithContact) => call.call_type === CallType.MISSED && !call.is_archived,
    ).length
  }, [calls])

  const tabs: Tab[] = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'archived', label: 'Archived' },
    { id: 'tune', label: '', icon: dataIcon },
  ]

  return (
    <div className="app-wrapper">
      {/* Fixed header section */}
      <div className="header-container">
        <Header title="Activity">
          <HeaderTabs
            tabs={tabs}
            defaultActiveTab="inbox"
            activeTab={activeTab}
            onTabChange={(tabId) => {
              setActiveTab(tabId)
              // If we're in detail view, switch back to list view
              if (viewState === 'detail') {
                setViewState('list')
              }
            }}
          />
        </Header>
      </div>

      {/* Content section */}
      <div className="container calls-container">
        {viewState === 'list' ? (
          <TabContent
            activeTab={activeTab}
            calls={calls}
            isLoading={isLoading}
            error={error as Error | null}
            onArchiveCall={archiveCall}
            onArchiveAllCalls={archiveAllCalls}
            onCallSelect={handleCallSelect}
          />
        ) : (
          <CallDetail
            callId={selectedCallId}
            onBack={handleBackToList}
            onArchive={archiveCall}
          />
        )}
      </div>

      {/* Bottom bar */}
      <BottomAppBar
        missedCalls={missedCallsCount}
        activeTab={bottomNavActive}
        onPhoneClick={() => setBottomNavActive('phone')}
        onProfileClick={() => setBottomNavActive('profile')}
        onDialpadClick={() => setBottomNavActive('dialpad')}
        onSettingsClick={() => setBottomNavActive('settings')}
        onStatusClick={() => setBottomNavActive('status')}
      />
    </div>
  )
}
