import './dashboard.scss'

import { Title } from 'react-admin'
import { Card, CardContent } from '@mui/material'
import { KeywordChart } from '../charts/keyword'
import { RelatedNeedsChart } from '../charts/relatedNeeds'
import { AllKeywordSearchesChart } from '../charts/allKeywords'

export function UserActivityDashboard() {
  return (
    <div className="UserActivityDashboard">
      <Card sx={{ mt: 8 }}>
        <Title title="Dashboard" />
        <CardContent>
          {/* <div>UserActivityDashboard</div> */}
          <KeywordChart />
          <AllKeywordSearchesChart />
          <RelatedNeedsChart />
        </CardContent>
      </Card>
    </div>
  )
}
