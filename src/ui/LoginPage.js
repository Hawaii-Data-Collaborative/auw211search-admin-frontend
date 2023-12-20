import './LoginPage.scss'

import axios from 'axios'
import { useState } from 'react'
import { Link, useNotify } from 'react-admin'
import { TextField, Button } from '@mui/material'
import { API_URL, BASE_URL } from '../constants'
import { getErrorMessage } from '../util'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const notify = useNotify()

  const submit = async () => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/login', { email: email.trim(), password })
      setSaving(false)
      window.location = BASE_URL
    } catch (err) {
      setSaving(false)
      notify(getErrorMessage(err), { type: 'error' })
    }
  }

  return (
    <div className="LoginPage full-page">
      <div className="box">
        <h2>AUW Admin Login</h2>
        <TextField type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" disabled={saving || !email.trim()} onClick={submit} sx={{ mt: 2 }} fullWidth>
          Submit
        </Button>
        <div style={{ paddingTop: 30 }}>
          <Link to="/reset_password" style={{ fontSize: 13, color: '#999' }}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}
