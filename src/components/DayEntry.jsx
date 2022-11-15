import LogsContext from '../context/LogsContext'
import { useContext, useState, useEffect } from "react"
import styles from '../styles/DayEntry.module.css'
import { postLog } from "../dbService"

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
      .then(result => setLogs({ ...logs, data: { ...logs.data, [result.monthYear]: result.entries } }))
      .catch(err => console.log(err))
    click({ open: false, day: null, weight: null })
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>{`${day}/${monthYear}`}</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="number"
            name="weight"
            defaultValue={weightInfo}
            onChange={(e) => setWeight(e.target.value)}
          />
        </form>
        <button 
          type="submit" 
          onClick={() => click({ open: false, day: null, weight: null })}>Close</button>
      </div>
    </div>
  )
}