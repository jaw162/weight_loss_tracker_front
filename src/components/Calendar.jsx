import LogsContext from '../context/LogsContext'
import DayEntry from './DayEntry'
import { useContext, useState } from 'react'
import Day from "./Day"
import styles from '../styles/Calendar.module.css'

export default function Calendar() {
  const { logs, backendFormat } = useContext(LogsContext)

  const [dayInfo, setDayInfo] = useState({ clicked: false, day: null, weight: null })

  const handleDayClick = (day, weight) => {
    setDayInfo({ clicked: true, day: day, weight: weight })
  }
  
  return (
    <div className={`calendar-container ${styles.container} ${logs.loading ? null : 'show'}`}>
        {backendFormat && 
        <Day 
          click={handleDayClick}
        />}
        {dayInfo.clicked && 
        <DayEntry
          day={dayInfo.day}
          monthYear={backendFormat}
          click={setDayInfo}
          weight={dayInfo.weight}
        />}
    </div>
  )
}