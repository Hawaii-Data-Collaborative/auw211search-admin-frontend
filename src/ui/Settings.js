import { Card, CardContent } from '@mui/material'
import { Title } from 'react-admin'

import './Settings.scss'

export function Settings() {
  return (
    <div className="Settings">
      <Card>
        <Title title="Settings" />
        <CardContent>Settings</CardContent>
      </Card>
    </div>
  )
}
