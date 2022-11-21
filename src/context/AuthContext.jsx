import dayjs from "dayjs"
import { createContext, useState, useEffect } from "react"
import { login, checkLogin } from "../dbService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ loading: true, user: null })

    console.log(user)

    useEffect(() => {
        checkLoggedIn()
    }, [])

    const loginHandler = (e, username, password) => {
        e.preventDefault()
        login(username, password)
          .then((result) => setUser({ loading: false, user: result }))
          .catch((err) => {
            console.log(err)
            setUser({ loading: false, user: null })
          })
    }

    const checkLoggedIn = () => {
        checkLogin()
          .then((result) => setUser({ loading: false, user: result.message }))
          .catch((err) => {
            console.log(err)
            setUser({ loading: false, user: null })
          })
    }

    return (
        <AuthContext.Provider value={{ user, loginHandler }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext