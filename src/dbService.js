const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001'

export const getAll = async () => {
    const res = await fetch(`${URL}`)

    const data = await res.json()

    return data
}

export const postLog = async ({ monthYear, day, weight }) => {
    const backRes = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "monthYear": monthYear,
          "day": day,
          "entry": weight
        })
      })
  
      const data = await backRes.json()

      return data
}