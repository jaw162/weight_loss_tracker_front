import { createContext, useState, useEffect } from "react"
import { login, checkLogin } from "../dbService"
import { logout } from "../dbService"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ loading: true, user: null })

    useEffect(() => {
        checkLoggedIn()
    }, [])

    const loginHandler = (e, username, password) => {
        e.preventDefault()
        login(username, password)
          .then((result) => setUser({ loading: false, user: result.username }))
          .catch((err) => {
            toast.error(err)
            setUser({ loading: false, user: null })
          })
    }

    const checkLoggedIn = () => {
        checkLogin()
          .then((result) => setUser({ loading: false, user: result.username }))
          .catch((err) => {
            console.log(err)
            setUser({ loading: false, user: null })
          })
    }

    const handleLogout = () => {
      logout()
        .then(result => {
          setUser({ loading: false, user: null })
        })
        .catch(err => console.log(err))
    }

    return (
        <AuthContext.Provider value={{ user, loginHandler, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext