import LogsContext from '../context/LogsContext'
import { useContext } from 'react'
import dayjs from 'dayjs'
import styles from '../styles/ProgressBar.module.css'

export default function ProgessBar() {
  const { logs } = useContext(LogsContext)
  const dayjsDate = !logs.loading && logs.recent ? dayjs(logs.recent.date) : null

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.stat}>
              <h3
                className={styles['stat-header']}
              >Goal Weight</h3>
              <h3
                className={styles.data}
              >{`${logs.goal}kg`}</h3>
          </div>
          <div className={styles.stat}>
              <h3
                className={styles['stat-header']}
              >Latest Entry</h3>
              <h3
                className={styles.data}
              >{!dayjsDate ? '-' : dayjsDate.format('DD MMMM YYYY')}</h3>
          </div>
          <div className={styles.stat}>
              <h3
                className={styles['stat-header']}
              >Current Weight</h3>
              <h3
                className={styles.data}
              >{!dayjsDate ? '-' : `${logs.recent.weight.toFixed(2)}kg`}</h3>
          </div>
          <div className={styles.stat}>
              <h3
                className={styles['stat-header']}
              >Distance from Weight</h3>
              {dayjsDate && <h3
                style={(logs.goal - logs.recent.weight) > 0 ? { color: 'green' } : { color: 'red' } }
                className={styles.data}
              >{!dayjsDate ? '-' : `${(logs.goal - logs.recent.weight).toFixed(2)}kg`}</h3>}
          </div>
        </div>
    </div>
  )
}