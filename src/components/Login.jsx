import { useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from "react"

export default function Login() {
  const { user, loginHandler } = useContext(AuthContext)
  const [form, setForm] = useState({})

  return (
    <div>
        <form onSubmit={(e) => loginHandler(e, form.username, form.password)}>
            <input 
              type='text'
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input 
              type='password'
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type='submit'></button>
        </form>
    </div>
  )
}