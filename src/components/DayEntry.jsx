import LogsContext from '../context/LogsContext'
import { useContext, useState, useEffect } from "react"
import styles from '../styles/DayEntry.module.css'
import { deleteEntry, postLog } from "../dbService"
import { latestEntry } from '../utils/statsHelpers'

export default function DayEntry({ day, monthYear, click, weight }) {

  const { logs, setLogs } = useContext(LogsContext)

  const [weightInfo, setWeight] = useState()

  useEffect(() => {
    if (!weight) return
    setWeight(weight)
  }, [weight])

  const handleSubmit = (e) => {
    e.preventDefault()
    postLog({ day: day, monthYear: monthYear, weight: weightInfo })
      .then(result => {
        setLogs((prev) => ({ 
          ...prev, data: { ...prev.data, [result.monthYear]: result.entries } 
        })
        )
        setLogs((prev) => ({ 
          ...prev, recent: latestEntry(prev.data)
        })
        )
      })
      .catch(err => console.log(err))
    click({ open: false, day: null, weight: null })
  }

  const handleDelete = (e, day, monthYear) => {
    e.preventDefault()
    const formatForReq = (date) => {
      const arr = date.split('/')
      return arr.join('%2F')
    }
    deleteEntry(day, formatForReq(monthYear))
      .then((result) => {
        setLogs({ ...logs, data: { ...logs.data, [monthYear]: (result.entries ?? null) } })
        click({ open: false, day: null, weight: null })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>{`${day}/${monthYear}`}</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="number"
            name="weight"
            step="0.01"
            defaultValue={weightInfo}
            onChange={(e) => setWeight(e.target.value)}
            // autoFocus
          />
        </form>
        <div className={styles.options}>
          {logs.data?.[monthYear]?.[day] && <button
            onClick={(e) => handleDelete(e, day, monthYear)}>Delete</button>}
          <button 
            type="submit" 
            onClick={() => click({ open: false, day: null, weight: null })}>Close</button>
        </div>
      </div>
    </div>
  )
}