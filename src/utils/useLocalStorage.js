import { useEffect, useState } from "react"

export const useLocalStorage = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const darkMode = JSON.parse(localStorage.getItem('darkMode'))
        setDark(darkMode ?? false)
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', dark)
    }, [dark])

    return [ dark, setDark ]
}