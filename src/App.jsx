import Calendar from "./components/Calendar"
import ChartDisplay from "./components/ChartDisplay"
import ProgessBar from "./components/ProgessBar"
import AuthContext from './context/AuthContext'
import { useContext } from "react"
import Login from "./components/Login"
import { ReactComponent as Sun } from './icon/sun.svg'
import { ReactComponent as Moon } from './icon/moon.svg'
import { useLocalStorage } from "./utils/useLocalStorage"
import { LogsProvider } from "./context/LogsContext"  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, handleLogout } = useContext(AuthContext)
  const [dark, setDark] = useLocalStorage()

  return (
    <div className={`${dark ? `dark` : `normal`} background`}>
      <ToastContainer />
      {!user.loading && !user.user && <Login />}
      {user.user && <div>
      <LogsProvider>
        <div className="side-bar"></div>
        <div className="top-bar">
          <h1>Weight Tracker</h1>
          <div className="buttons">
            {/* <button>Generate</button>
            <button>Reset</button> */}
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
            <p>Welcome {user.user}, 
            <span 
              onClick={handleLogout}
              style={{ fontWeight: '800' }}
            > Log Out?</span></p>
          </div>
        </div>
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
