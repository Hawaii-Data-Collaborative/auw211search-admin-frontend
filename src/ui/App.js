import './App.scss'

import { Admin, CustomRoutes, Resource, Layout as RALayout, Menu as RAMenu } from 'react-admin'
import { QueryClient } from 'react-query'
import { Route } from 'react-router-dom'
import { dataProvider } from 'ra-data-simple-prisma'
import GroupIcon from '@mui/icons-material/Group'
import BusinessIcon from '@mui/icons-material/Business'
import StoreIcon from '@mui/icons-material/Store'
import SettingsIcon from '@mui/icons-material/Settings'
import { authProvider } from '../authProvider'
import { UserActivityList } from './user-activity'
import { AgencyList } from './agency'
import { ProgramEdit, ProgramList } from './program'
import { API_URL } from '../constants'
import { Settings } from './Settings'

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
    <RAMenu.Item to="/user_activity" primaryText="User Activity" leftIcon={<GroupIcon />} />
    <RAMenu.Item to="/program" primaryText="Programs" leftIcon={<StoreIcon />} />
    <RAMenu.Item to="/agency" primaryText="Agencies" leftIcon={<BusinessIcon />} />
    <RAMenu.Item to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
  </RAMenu>
)

const Layout = props => <RALayout {...props} menu={Menu} />

export function App() {
  return (
    <Admin layout={Layout} authProvider={authProvider} dataProvider={dataProvider(API_URL)} queryClient={queryClient}>
      <Resource name="user_activity" list={UserActivityList} icon={GroupIcon} />
      <Resource name="program" list={ProgramList} edit={ProgramEdit} icon={StoreIcon} />
      <Resource name="agency" list={AgencyList} icon={BusinessIcon} />
      <CustomRoutes>
        <Route path="/settings" element={<Settings />} />
      </CustomRoutes>
    </Admin>
  )
}
