import { useState } from 'react'
import './HeaderTabs.css'

export type Tab = {
  id: string
  label: string
  icon?: string
}

interface HeaderTabsProps {
  tabs: Tab[]
  defaultActiveTab?: string
  onTabChange?: (tabId: string) => void
}

export function HeaderTabs({ tabs, defaultActiveTab = tabs[0]?.id, onTabChange }: HeaderTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return // Prevent unnecessary re-renders

    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  // Get the index of the active tab for positioning the indicator
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  return (
    <div className="header-tabs-container">
      <div className="header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`header-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="tab-content">
              {tab.icon && (
                <img
                  src={tab.icon}
                  alt=""
                  className="header-tab-icon"
                />
              )}
              {tab.label && <span>{tab.label}</span>}
            </div>
          </button>
        ))}
        
        {/* Sliding indicator */}
        <div 
          className="tab-indicator" 
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * activeTabIndex}%`
          }}
        />
      </div>
    </div>
  )
}
