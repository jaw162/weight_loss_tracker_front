const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001/'

export const getAll = async () => {
    const res = await fetch(`${URL}api/users/me`, {
      credentials: 'include',
    })

    const data = await res.json()

    if (res.ok) {
      return data
    } else {
      throw new Error(data.error)
    }
}

export const postLog = async ({ monthYear, day, weight }) => {
    const backRes = await fetch(`${URL}api/months`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          "monthYear": monthYear,
          "day": day,
          "entry": weight
        })
      })
  
      const data = await backRes.json()

      return data
}

export const login = async ( username, password ) => {
  const backRes = await fetch(`${URL}api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })

    const data = await backRes.json()

    if (backRes.ok) {
      return data
    } else {
      throw `${data.message}`
    }
}

export const checkLogin = async () => {

  const backRes = await fetch(`${URL}api/users/check`, {
      credentials: 'include'
    })

    const data = await backRes.json()

    if (backRes.ok) {
      return data
    } else {
      throw `${data.message}`
    }
}

export const logout = async () => {

  const backRes = await fetch(`${URL}api/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      credentials: 'include'
    })

    const data = await backRes.json()

    if (backRes.ok) {
      return data
    } else {
      throw new Error(data.error)
    }
}

export const deleteEntry = async (day, monthYear) => {

  const backRes = await fetch(`${URL}api/months/${day}/${monthYear}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    const data = await backRes.json()

    if (backRes.ok) {
      return data
    } else {
      throw `${data.message}`
    }
}