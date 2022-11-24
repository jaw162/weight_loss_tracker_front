import { useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from "react"
import styles from '../styles/Login.module.css'

export default function Login() {
  const { loginHandler } = useContext(AuthContext)
  const [form, setForm] = useState({})

  return (
    <div className={styles.container}>
      <div className={styles['user-details']}>
        <h4>Test User 1</h4>
        <p>Username: hello</p>
        <p>Password: hello</p>
      </div>
      <div className={styles['user-details']}>
        <h4>Test User 2</h4>
        <p>Username: hello2</p>
        <p>Password: hello2</p>
      </div>
      <form 
        onSubmit={(e) => loginHandler(e, form.username, form.password)}
        className={styles.form}
      >
        <h3>Welcome Back!</h3>
        <div className={styles.login}>
          <h4>Username</h4>
          <input 
            type='text'
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <h4>Password</h4>
          <input 
            type='password'
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type='submit'>Log In</button>
        </div>
      </form>
    </div>
  )
}