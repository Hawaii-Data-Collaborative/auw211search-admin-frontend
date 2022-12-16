import './App.scss'

import { Admin, CustomRoutes, Resource, Layout as RALayout, Menu as RAMenu } from 'react-admin'
import { QueryClient } from 'react-query'
import { Route } from 'react-router-dom'
import { dataProvider } from 'ra-data-simple-prisma'
import GroupIcon from '@mui/icons-material/Group'
import StoreIcon from '@mui/icons-material/Store'
import SettingsIcon from '@mui/icons-material/Settings'
import { authProvider } from '../authProvider'
import { UserActivityList } from './resources/userActivity'
// import { AgencyList } from './agency'
import { ProgramEdit, ProgramList } from './resources/program'
import { API_URL } from '../constants'
import { Settings } from './Settings'
import { Dashboard } from './Dashboard'
import { UserActivityDashboard } from './resources/dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: 'always'
    }
  }
})

const Menu = props => (
  <RAMenu {...props}>
    <RAMenu.DashboardItem primaryText="Home" />
    <RAMenu.Item to="/dashboard" primaryText="User Activity - Dashboard" leftIcon={<GroupIcon />} />
    <RAMenu.Item to="/user_activity" primaryText="User Activity - List" leftIcon={<GroupIcon />} />
    <RAMenu.Item to="/program" primaryText="Programs" leftIcon={<StoreIcon />} />
    {/* <RAMenu.Item to="/agency" primaryText="Agencies" leftIcon={<BusinessIcon />} /> */}
    <RAMenu.Item to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
  </RAMenu>
)

const Layout = props => <RALayout {...props} menu={Menu} />

export function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider(API_URL)}
      queryClient={queryClient}
      layout={Layout}
      dashboard={Dashboard}
    >
      <Resource name="dashboard" list={UserActivityDashboard} />
      <Resource name="user_activity" list={UserActivityList} />
      <Resource name="program" list={ProgramList} edit={ProgramEdit} />
      {/* <Resource name="agency" list={AgencyList} /> */}
      <CustomRoutes>
        <Route path="/settings" element={<Settings />} />
      </CustomRoutes>
    </Admin>
  )
}
