import './App.css'
import { useState } from 'react'
import { CallList } from '@components/CallList'
import { useCalls } from '@hooks/useCalls'
import { Header } from '@components/Header'
import { HeaderTabs, Tab } from '@components/HeaderTabs'
import { BottomAppBar } from '@components/BottomAppBar'

export function App() {
  const { data: calls, isLoading, error, archiveCall, archiveAllCalls } = useCalls()
  const [activeTab, setActiveTab] = useState<Tab['id']>('inbox')

  const tabs: Tab[] = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'archived', label: 'Archived' },
  ]

  return (
    <div className="app-wrapper">
      <div className="container">
        <Header title="Activity">
          <HeaderTabs
            tabs={tabs}
            defaultActiveTab="inbox"
            onTabChange={setActiveTab}
          />
        </Header>
      </div>
      <div
        className="container calls-container"
        style={{ marginTop: '1rem' }}
      >
        <CallList
          calls={calls}
          isLoading={isLoading}
          error={error as Error | null}
          isArchived={activeTab === 'archived'}
          onArchiveCall={archiveCall}
          onArchiveAllCalls={archiveAllCalls}
        />
      </div>
      <BottomAppBar 
        missedCalls={12}
        onPhoneClick={() => console.log('Phone clicked')}
        onProfileClick={() => console.log('Profile clicked')}
        onDialpadClick={() => console.log('Dialpad clicked')}
        onSettingsClick={() => console.log('Settings clicked')}
        onStatusClick={() => console.log('Status clicked')}
      />
    </div>
  )
}
