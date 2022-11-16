import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Line } from 'react-chartjs-2'
  import { useState, useContext } from 'react'
  import LogsContext from '../context/LogsContext'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  export default function ChartDisplay() {
    const { logs, backendFormat, parseDate, today } = useContext(LogsContext)
    const [showYear, setShow] = useState(false)

    const month = logs.data?.[backendFormat]
    
    const setGraphUpperBound = (data) => {
      const highest = Object.values(data).reduce((a, b) => (
        a > b ? a : b
      ))
      return highest
    }

    const dayjsDate = backendFormat ? parseDate(backendFormat) : today 
  
    const thisMonthLabels = Array.from(Array(dayjsDate.daysInMonth()), (x, i) => i + 1)
  
    const year = dayjsDate.format('YY')

    const thisYearLabels = Array.from(Array(12), (x, i) => `${i + 1}/${year}`)
  
    const monthlyAverages = thisYearLabels.map(label => (
      logs.data?.[label] ? logs.data[label].average : null
    ))
  
    const dailyData = thisMonthLabels.map(label => (
      month?.[label] ? month[label] : null
    ))
    
    const byMonthUpperBound = month ? setGraphUpperBound(month) : 100
  
    const byYearUpperBound = monthlyAverages.reduce((a, b) => (
      a > b ? a : b
    ))
  
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: showYear ? dayjsDate.format('YYYY') : dayjsDate.format('M/YY'),
        },
      },
      spanGaps: true,
      scales: {
        y: {
          max: showYear ? byYearUpperBound + 10 : byMonthUpperBound + 10,
          title: {
            display: true,
            text: 'kg',
            align: 'center'
          },
          beginAtZero: true,
          grid: {
            display: false
          }
        },
        x: {
          title: {
            display: true,
            text: showYear ? 'Month' : 'Day',
            align: 'center'
          },
          grid: {
            display: false
          }
        },
      },
      maintainAspectRatio: false,
      layout: {
        padding: 20
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  
    const monthData = {
      labels: thisMonthLabels,
      datasets: [
        {
          label: 'Weight',
          data: dailyData,
          borderColor: 'rgb(80, 99, 255)',
          backgroundColor: 'rgba(80, 99, 255, 0.5)',
        },
      ],
    }
    const yearData = {
      labels: thisYearLabels,
      datasets: [
        {
          label: 'Weight',
          data: monthlyAverages,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    }
  
    return (
      <div style={{ height: '100%' }} className={`chart-container ${logs.loading ? null : 'show'}`}>
        <Line 
          options={options} 
          data={showYear ? yearData : monthData}
        />
        <button 
          onClick={() => setShow(!showYear)}
          style={{ all: 'unset', textAlign: 'center', width: '100%', padding: '1rem', cursor: 'pointer' }}
        >{showYear ? 'Show Results By Month' : 'Show Results By Year'}</button>
      </div>
    )
  }