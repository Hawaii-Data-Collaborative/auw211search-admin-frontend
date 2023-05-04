import './Banner.scss'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Title, Toolbar, useAuthProvider, useNotify, usePermissions } from 'react-admin'
import { Card, CardContent, Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { API_URL } from '../constants'

export function Banner() {
  usePermissions()
  const authProvider = useAuthProvider()
  const permissions = authProvider.getPermissionsSync()

  const notify = useNotify()
  const [bannerText, setBannerText] = useState('')
  const [bannerLink, setBannerLink] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get(API_URL + '/settings').then(res => {
      setBannerText(res.data.bannerText)
      setBannerLink(res.data.bannerLink)
    })
  }, [])

  const onSaveClick = async () => {
    try {
      setSaving(true)
      const data = {
        bannerText: bannerText.trim(),
        bannerLink: bannerLink.trim()
      }
      await axios.post(API_URL + '/settings', data)
      notify('Saved.')
      setSaving(false)
    } catch (err) {
      setSaving(false)
      notify(err.message, { type: 'error' })
    }
  }

  const canEdit = permissions.includes('Categories.Change')

  return (
    <div className="Banner">
      <Card sx={{ mt: 8 }}>
        <Title title="Homepage Banner" />
        <CardContent>
          <TextField
            label="Banner text"
            value={bannerText}
            onChange={e => setBannerText(e.target.value)}
            minRows={5}
            multiline
            fullWidth
          />

          <TextField label="Banner link" value={bannerLink} onChange={e => setBannerLink(e.target.value)} fullWidth />

          {canEdit && (
            <div className="toolbar-wrapper">
              <Toolbar>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onSaveClick}
                  disabled={saving}
                  startIcon={<SaveIcon />}
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </Toolbar>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
