/* eslint-disable react/jsx-no-target-blank */
import './Dashboard.scss'

import { Link, Title } from 'react-admin'
import { Card, CardContent } from '@mui/material'

export function Dashboard() {
  return (
    <Card sx={{ mt: 8 }}>
      <Title title="Home" />
      <CardContent>
        <p>
          Welcome to the admin site for{' '}
          <a href="https://search.auw211.org" target="_blank">
            search.auw211.org
          </a>
          . Use the sidebar links to manage the application.
        </p>
        <ul>
          <li>
            Go to <Link to="/user_activity">User Activity</Link> to see how people are using the site and what they're
            searching for.
          </li>
          <li>
            Go to <Link to="/program">Programs</Link> to add custom keywords to help the search engine guide users to
            certain programs.
          </li>
          <li>
            Go to <Link to="/settings">Settings</Link> to fine-tune the search engine behavior.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
