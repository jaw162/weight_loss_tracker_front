import Calendar from "./components/Calendar"
import ChartDisplay from "./components/ChartDisplay"
import ProgessBar from "./components/ProgessBar"
import AuthContext from './context/AuthContext'
import { useContext, useState, useEffect } from "react"
import Login from "./components/Login"
import { useLocalStorage } from "./utils/useLocalStorage"
import { LogsProvider } from "./context/LogsContext"  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header"

function App() {
  const { user, handleLogout } = useContext(AuthContext)
  const [dark, setDark] = useLocalStorage()
  const [wideScreen, setWide] = useState(false)

  useEffect(() => {
    const isWide = window.matchMedia('(min-width: 600px)').matches
    setWide({ isWide: isWide, showChart: false })
  }, [])

  return (
    <div className={`${dark ? `dark` : `normal`} background`}>
      <ToastContainer />
      {!user.loading && !user.user && <Login />}
      {user.user &&
      <LogsProvider>
          <Header 
            dark={dark}
            setDark={setDark}
            user={user}
            handleLogout={handleLogout}
          />
          {!wideScreen.isWide &&
          <nav 
            className="mobile-nav"
          >
            <button
              className={wideScreen.showChart ? null : 'active'}
              onClick={() => setWide({ ...wideScreen, showChart: false })}
            >Calendar</button>
            <button
              className={wideScreen.showChart ? 'active' : null}
              onClick={() => setWide({ ...wideScreen, showChart: true })}
            >Chart</button>
          </nav>
          }
          {wideScreen.isWide && <ProgessBar />}
          {wideScreen.isWide ? 
          <div className="wrapper">
            <Calendar />
            <ChartDisplay dark={dark} />
          </div> : 
          <div 
            style={wideScreen.showChart ? { transform: 'translateX(-50%)' } : { transform: 'none' }} 
            className="mobile-wrapper">
            <Calendar />
            <ChartDisplay dark={dark} />
          </div>
          }
        </LogsProvider>}
    </div>
  )
}

export default App
