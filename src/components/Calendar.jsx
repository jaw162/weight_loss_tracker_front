import LogsContext from '../context/LogsContext'
import DayEntry from './DayEntry'
import { useContext, useState } from 'react'
import Day from "./Day"
import styles from '../styles/Calendar.module.css'
import { ReactComponent as Arrow } from '../icon/down-arrow.svg'

export default function Calendar() {
  const { logs, backendFormat, handleBackwardClick, handleForwardClick } = useContext(LogsContext)

  const [dayInfo, setDayInfo] = useState({ clicked: false, day: null, weight: null })

  const handleDayClick = (day, weight) => {
    setDayInfo({ clicked: true, day: day, weight: weight })
  }
  
  return (
    <div className={`${styles.container} ${logs.loading ? null : 'show'}`}>
      <div 
        className={styles['arrow-containers']}
        onClick={() => handleBackwardClick()}
      >
        <span
        ><Arrow /></span>
      </div>
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
      <div 
        className={styles['arrow-containers']}
        onClick={() => handleForwardClick()}
      >
        <span><Arrow /></span>
      </div>
    </div>
  )
}