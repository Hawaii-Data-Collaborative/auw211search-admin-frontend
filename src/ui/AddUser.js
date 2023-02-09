import axios from 'axios'
import { useState } from 'react'
import { Card } from '@mui/material'
import { EditContextProvider, SimpleForm, TextInput, Title, useNotify } from 'react-admin'
import { API_URL } from '../constants'
import { getErrorMessage } from '../util'

import './AddUser.scss'

export function AddUser() {
  const notify = useNotify()
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({ email: '' })
  const [saving, setSaving] = useState(false)

  const onSubmit = async data => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/users', { email: data.email.trim() })
      setTimeout(() => setSaving(false), 1500)
      notify('Saved. They will receive an email to activate their account.')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      setSaving(false)
      notify(getErrorMessage(err), { type: 'error' })
    }
  }

  return (
    <div className="AddUser">
      <Card>
        <Title title="Add User" />
        <EditContextProvider
          value={{
            record: user,
            save: onSubmit,
            saving
          }}
        >
          <SimpleForm sx={{ maxWidth: 400 }}>
            <TextInput type="email" source="email" label="Email" fullWidth />
          </SimpleForm>
        </EditContextProvider>
      </Card>
    </div>
  )
}
