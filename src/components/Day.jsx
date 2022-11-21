import LogsContext from '../context/LogsContext'
import { useContext } from 'react'
import styles from '../styles/Day.module.css'
import { ReactComponent as Arrow } from '../icon/down-arrow.svg'

export default function Day({ click }) {
  const { logs, backendFormat, today, parseDate, handleBackwardClick, handleForwardClick } = useContext(LogsContext)

  const parsedDate = parseDate(backendFormat)

  const month = logs.data[backendFormat]

  const todayDate = parsedDate.format('M/YY') === today.format('M/YY')

  return (
    <div className={styles.layout}>
      <div className={styles['month-year']}>
        <div 
          className={styles['arrow-containers']}
          onClick={() => handleBackwardClick()}
        >
          <span
          ><Arrow /></span>
        </div>
        <h3>{parsedDate.format('MMMM YYYY')}</h3>
        <div 
          className={styles['arrow-containers']}
          onClick={() => handleForwardClick()}
        >
          <span><Arrow /></span>
        </div>
      </div>
      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
        {Array.from(Array(parsedDate.daysInMonth()), (x, i) => (
              <div 
                key={`${i}`}
                style={i === 0 ? { gridColumnStart: `${parsedDate.startOf('month').day() + 1}` } : null}
                className={month?.[[ i + 1 ]]  ? `${styles['entry-present']} ${styles.day}` : styles.day}
                onClick={() => {
                  month?.[[ i + 1 ]] ? click(i + 1, month[[ i + 1 ]]) : click(i + 1)
                }}
              >
                <p
                  style={todayDate && i + 1 === Number(today.format('D')) ? { backgroundColor: 'black', color: 'white' } : null}
                >{i + 1}</p>
              </div>
            )
          )}       
    </div>
  )
}