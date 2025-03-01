import React from 'react'
import { PiPhone, PiPhoneFill, PiArchive, PiGear, PiUser, PiNumpad } from 'react-icons/pi'
import './IconsDemo.css'

export const IconsDemo: React.FC = () => {
  return (
    <div className="icons-demo">
      <div className="top-nav">
        <div className="activity-section">
          <div className="circle-icon-container">
            <PiPhoneFill className="green-icon" />
          </div>
          <span>Activity</span>
        </div>
        <div className="tabs">
          <div className="tab-item active">
            <span>Inbox</span>
          </div>
          <div className="tab-item">
            <span>All calls</span>
          </div>
        </div>
      </div>

      <div className="archive-section">
        <PiArchive className="icon-gray" />
        <span>Archive all calls</span>
      </div>

      <div className="calls-section">
        <div className="date-divider">JULY, 27 2017</div>
        <div className="call-item">
          <div className="call-avatar">
            <PiPhone className="icon-red" />
          </div>
          <div className="call-details">
            <div>+33 6 45 13 53 91</div>
            <div className="call-description">tried to call on Xavier</div>
          </div>
          <div className="call-time">
            <div>07:58</div>
            <div>PM</div>
          </div>
        </div>

        <div className="date-divider">JULY, 21 2017</div>
        <div className="call-item">
          <div className="call-avatar">
            <PiPhone className="icon-red" />
          </div>
          <div className="call-details">
            <div>+33 6 45 13 53 91</div>
            <div className="call-description">tried to call on Xavier</div>
          </div>
          <div className="call-time">
            <div>12:34</div>
            <div>PM</div>
          </div>
        </div>
      </div>

      <div className="bottom-nav">
        <div className="nav-item">
          <div className="notification-badge">12</div>
          <PiPhoneFill className="nav-icon" />
        </div>
        <div className="nav-item">
          <PiUser className="nav-icon" />
        </div>
        <div className="nav-item main-action">
          <PiNumpad className="nav-icon" />
        </div>
        <div className="nav-item">
          <PiGear className="nav-icon" />
        </div>
        <div className="nav-item">
          <div className="status-dot"></div>
        </div>
      </div>
    </div>
  )
}

export default IconsDemo
