import { LogsProvider } from "./context/LogsContext"
import Calendar from "./components/Calendar"
import ChartDisplay from "./components/ChartDisplay"
import ProgessBar from "./components/ProgessBar"
import AuthContext from './context/AuthContext'
import { useContext, useState } from "react"
import Login from "./components/Login"
import { ReactComponent as Sun } from './icon/sun.svg'
import { ReactComponent as Moon } from './icon/moon.svg'
import { useLocalStorage } from "./utils/useLocalStorage"

function App() {
  const { user } = useContext(AuthContext)
  const [dark, setDark] = useLocalStorage()

  return (
    <div className={`${dark ? `dark` : `normal`} background`}>
      {!user.loading && !user.user && <Login />}
      {user.user && <div>
        <div className="side-bar"></div>
        <div className="top-bar">
          <h1>Weight Tracker</h1>
          <div className="dark-mode-toggle">
            <Sun />
            <button 
              className="button"
              onClick={() => setDark(!dark)}
            >
              <span
               style={dark ? { transform: 'translateX(140%)' } : null}
              ></span>
            </button>
            <Moon />
          </div>
        </div>
        <LogsProvider>
          <div className="main-display">
            <ProgessBar />  
            <Calendar />
            <ChartDisplay dark={dark} />
          </div>
        </LogsProvider>
      </div>}
    </div>
  )
}

export default App
