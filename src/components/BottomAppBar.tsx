import React from 'react'
import './BottomAppBar.css'

import phoneIcon from '@assets/icons/headset-dark.svg'
import profileIcon from '@assets/icons/Dark/Color=Black, Type=profile.svg'
import settingsIcon from '@assets/icons/Dark/Color=Black, Type=gear.svg'
import dialpadIcon from '@assets/icons/dialpad.svg'

interface BottomAppBarProps {
  missedCalls?: number
  onPhoneClick?: () => void
  onProfileClick?: () => void
  onDialpadClick?: () => void
  onSettingsClick?: () => void
  onStatusClick?: () => void
  activeTab?: 'phone' | 'profile' | 'dialpad' | 'settings' | 'status'
}

export const BottomAppBar: React.FC<BottomAppBarProps> = ({
  missedCalls = 0,
  onPhoneClick,
  onProfileClick,
  onDialpadClick,
  onSettingsClick,
  onStatusClick,
  activeTab = 'phone',
}) => {
  return (
    <div className="bottom-app-bar">
      <div className="bottom-app-bar-content">
        {/* Green indicator line */}
        <div className="bottom-indicator-container">
          <div className={`bottom-indicator ${activeTab}`}></div>
        </div>
        <div
          className={`nav-item ${activeTab === 'phone' ? 'active' : ''}`}
          onClick={onPhoneClick}
        >
          <div className="icon-wrapper">
            <img
              src={phoneIcon}
              alt="Calls"
              className="nav-icon"
            />
            {missedCalls > 0 && (
              <div className="badge">{missedCalls > 99 ? '99+' : missedCalls}</div>
            )}
          </div>
        </div>

        <div
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={onProfileClick}
        >
          <img
            src={profileIcon}
            alt="Profile"
            className="nav-icon"
          />
        </div>

        <div
          className={`dialpad-button ${activeTab === 'dialpad' ? 'active' : ''}`}
          onClick={onDialpadClick}
        >
          <img
            src={dialpadIcon}
            alt="Dialpad"
            className="dialpad-icon-svg"
          />
        </div>

        <div
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={onSettingsClick}
        >
          <img
            src={settingsIcon}
            alt="Settings"
            className="nav-icon"
          />
        </div>

        <div
          className={`nav-item ${activeTab === 'status' ? 'active' : ''}`}
          onClick={onStatusClick}
        >
          <div className="status-indicator active"></div>
        </div>
      </div>
    </div>
  )
}
