import { useState } from 'react'
import './HeaderTabs.css'

export type Tab = {
  id: string
  label: string
}

interface HeaderTabsProps {
  tabs: Tab[]
  defaultActiveTab?: string
  onTabChange?: (tabId: string) => void
}

export function HeaderTabs({ tabs, defaultActiveTab = tabs[0]?.id, onTabChange }: HeaderTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  return (
    <div className="header-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`header-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
      <div className="header-tabs-indicator"></div>
    </div>
  )
}
