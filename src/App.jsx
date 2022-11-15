import { LogsProvider } from "./context/LogsContext"
import Calendar from "./components/Calendar"
import ChartDisplay from "./components/ChartDisplay"

function App() {

  return (
    <div>
      <div className="side-bar"></div>
      <div className="top-bar"><h1>Weight Tracker</h1></div>
      <LogsProvider>
        <div className="main-display">
          <div className='calendar-container'>
            <Calendar />
          </div>
          <div className='chart-container'>
            <ChartDisplay />
          </div>
        </div>
      </LogsProvider>
    </div>
  )
}

export default App
