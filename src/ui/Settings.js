import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import {
  EditContextProvider,
  NumberInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  Title,
  Toolbar as RAToolbar,
  useNotify
} from 'react-admin'

import { API_URL } from '../constants'

import './Settings.scss'

export function Settings() {
  const notify = useNotify()
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios
      .get(API_URL + '/settings')
      .then(res => {
        setSettings(res.data)
      })
      .catch(err => {
        notify(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async data => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/settings', data)
      setSaving(false)
      notify('Saved')
    } catch (err) {
      setSaving(false)
      notify(err.message)
    }
  }

  if (!settings) {
    return null
  }

  return (
    <div className="Settings">
      <Card>
        <Title title="Settings" />
        <EditContextProvider
          value={{
            record: settings,
            save: onSubmit,
            saving
          }}
        >
          <SimpleForm sx={{ maxWidth: 400 }} toolbar={<Toolbar />}>
            <SelectInput
              source="trendingRange"
              choices={[
                { id: 'week', name: 'Last 7 days' },
                { id: 'month', name: 'Last 30 days' },
                { id: 'quarter', name: 'Last 120 days' },
                { id: 'year', name: 'Last 365 days' }
              ]}
              fullWidth
            />
            <NumberInput source="trendingMinCount" label="Minimum # of hits for trending" fullWidth />
          </SimpleForm>
        </EditContextProvider>
      </Card>
    </div>
  )
}

function Toolbar() {
  const formCtx = useFormContext()

  const onSuccess = () => {
    formCtx.reset()
  }

  return (
    <RAToolbar>
      <SaveButton mutationOptions={{ onSuccess }} type="button" />
    </RAToolbar>
  )
}
