import Calendar from "./components/Calendar"
import ChartDisplay from "./components/ChartDisplay"
import ProgessBar from "./components/ProgessBar"
import AuthContext from './context/AuthContext'
import { useContext } from "react"
import Login from "./components/Login"
import { useLocalStorage } from "./utils/useLocalStorage"
import { LogsProvider } from "./context/LogsContext"  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header"

function App() {
  const { user, handleLogout } = useContext(AuthContext)
  const [dark, setDark] = useLocalStorage()

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
          <div className="wrapper">
            <ProgessBar />  
            <Calendar />
            <ChartDisplay dark={dark} />
          </div>
        </LogsProvider>}
    </div>
  )
}

export default App
