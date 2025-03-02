import React from 'react'
import './DateItem.css'

interface DateItemProps {
  date: string // ISO date string
}

export const DateItem: React.FC<DateItemProps> = ({ date }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }

    const dateObj = new Date(dateString)
    const formattedDate = dateObj.toLocaleDateString('en-US', options)

    // Convert to uppercase and add commas
    const parts = formattedDate.split(' ')
    return `${parts[0].toUpperCase()}, ${parts[1]} ${parts[2]}`
  }

  return (
    <div className="date-item">
      <div className="date-line"></div>
      <div className="date-text">{formatDate(date)}</div>
      <div className="date-line"></div>
    </div>
  )
}
