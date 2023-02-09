import './ResetPassword.scss'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { TextField, Button } from '@mui/material'
import { API_URL } from '../constants'

export function ResetPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const notify = useNotify()

  useEffect(() => {
    const params = new URLSearchParams(window.location.href.split('?')[1])
    const email = params.get('email')
    let token = params.get('token')
    if (email && token) {
      token = decodeURIComponent(token).replace('#/login', '').trim()
      setEmail(decodeURIComponent(email))
      setStep(2)
      const checkToken = async () => {
        try {
          await axios.post(API_URL + '/check_reset_password_token', { token })
          setLoading(false)
        } catch (err) {
          setError(err.response?.data?.message || err.message)
          setLoading(false)
        }
      }
      checkToken()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCreateTokenClick = async () => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/create_reset_password_token', { email: email.trim() })
      setSaving(false)
      setSuccess(true)
    } catch (err) {
      setSaving(false)
      notify(err.response?.data?.message || err.message, { type: 'error' })
    }
  }

  const onUpdatePasswordClick = async () => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/update_password', { email: email.trim(), password })
      setSaving(false)
      setSuccess(true)
      setTimeout(() => {
        window.location = '/'
      }, 1000)
    } catch (err) {
      setSaving(false)
      notify(err.response?.data?.message || err.message, { type: 'error' })
    }
  }

  if (loading) {
    return null
  }

  let ui
  if (step === 1) {
    ui = success ? (
      <div style={{ fontSize: 14 }}>A link has been sent to your email. It expires in ten minutes.</div>
    ) : (
      <>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <Button
          variant="contained"
          disabled={saving || !email.trim()}
          onClick={onCreateTokenClick}
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit
        </Button>
      </>
    )
  } else {
    ui = success ? (
      <div style={{ fontSize: 14 }}>Success 👍</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <>
        <TextField
          type="password"
          label="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          type="password"
          label="Confirm new password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          disabled={saving || password.trim().length < 6 || password2 !== password}
          onClick={onUpdatePasswordClick}
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit
        </Button>
      </>
    )
  }

  return (
    <div className="ResetPassword full-page">
      <div className="box">
        <h2>Reset Password</h2>
        {ui}
      </div>
    </div>
  )
}
