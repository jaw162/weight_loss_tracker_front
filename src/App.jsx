import { LogsProvider } from "./context/LogsContext"
import Calendar from "./components/Calendar"
import ChartDisplay from "./components/ChartDisplay"
import ProgessBar from "./components/ProgessBar"
import AuthContext from './context/AuthContext'
import { useContext } from "react"
import Login from "./components/Login"

function App() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      {!user.loading && !user.user && <Login />}
      {user.user && <div>
        <div className="side-bar"></div>
        <div className="top-bar"><h1>Weight Tracker</h1></div>
        <LogsProvider>
          <div className="main-display">
            <ProgessBar />  
            <Calendar />
            <ChartDisplay />
          </div>
        </LogsProvider>
      </div>}
    </div>
  )
}

export default App
