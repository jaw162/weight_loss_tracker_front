import dayjs from "dayjs"
import { createContext, useState, useEffect } from "react"
import { getAll } from "../dbService"
import { latestEntry } from "../utils/statsHelpers"

const LogsContext = createContext()

export const LogsProvider = ({ children }) => {
    const [logs, setLogs] = useState({ loading: true, data: {} })
    const [monthYear, setMonthYear] = useState({})

    const today = dayjs()

    const backendFormat = logs.loading ? null : Object.values(monthYear).join('/')

    const parseDate = (monthYear) => {
      const fullDate = monthYear.split('/')
    
      return dayjs(`${fullDate[0]}/01/${fullDate[1]}`)
    }

    const handleForwardClick = () => {
        if (monthYear.month < 12) {
          setMonthYear({ ...monthYear, month: monthYear.month + 1 })
        } else {
          setMonthYear({ month: 1, year: monthYear.year + 1 })
        }
      }
    
    const handleBackwardClick = () => {
        if (monthYear.month > 1) {
            setMonthYear({ ...monthYear, month: monthYear.month - 1 })
        } else {
            setMonthYear({ month: 12, year: monthYear.year - 1 })
        }
    }

    useEffect(() => {
        getAll()
          .then(result => {
            setMonthYear({ month: Number(today.format('M')), year: Number(today.format('YY')) })
            setLogs({ loading: false, data: result, recent: latestEntry(result) })
          })
          .catch(err => console.log(err))
    }, [])

    return (
        <LogsContext.Provider value={{ logs, setLogs, backendFormat, today, handleForwardClick, handleBackwardClick, parseDate }}>
            {children}
        </LogsContext.Provider>
    )
}

export default LogsContext