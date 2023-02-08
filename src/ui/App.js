import './App.scss'

import { Admin, CustomRoutes, Resource, Layout as RALayout, Menu as RAMenu } from 'react-admin'
import { QueryClient } from 'react-query'
import { Route } from 'react-router-dom'
import { dataProvider as createDataProvider } from 'ra-data-simple-prisma'
import { AxiosRequestConfig } from 'axios'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import GroupIcon from '@mui/icons-material/Group'
import StoreIcon from '@mui/icons-material/Store'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { authProvider } from '../authProvider'
import { UserActivityList } from './resources/userActivity'
// import { AgencyList } from './agency'
import { ProgramEdit, ProgramList } from './resources/program'
import { API_URL } from '../constants'
import { Settings } from './Settings'
import { Dashboard } from './Dashboard'
import { UserActivityDashboard } from './resources/dashboard'
import { Categories } from './Categories'
import { Loading } from './Loading'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: 'always'
    }
  }
})

const dataProvider = createDataProvider(API_URL, {
  axiosInterceptors: {
    request: [
      {
        onFulfilled: (config: AxiosRequestConfig) => {
          config.withCredentials = true
          return config
        }
      }
    ]
  }
})

const Menu = props => (
  <RAMenu {...props}>
    <RAMenu.DashboardItem primaryText="Home" />
    <RAMenu.Item to="/dashboard" primaryText="User Activity - Dashboard" leftIcon={<GroupIcon />} />
    <RAMenu.Item to="/user_activity" primaryText="User Activity - List" leftIcon={<GroupIcon />} />
    <RAMenu.Item to="/program" primaryText="Programs" leftIcon={<StoreIcon />} />
    {/* <RAMenu.Item to="/agency" primaryText="Agencies" leftIcon={<BusinessIcon />} /> */}
    <RAMenu.Item to="/categories" primaryText="Categories" leftIcon={<AccountTreeIcon />} />
    <RAMenu.Item to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
  </RAMenu>
)

const Layout = props => <RALayout {...props} menu={Menu} />

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        queryClient={queryClient}
        layout={Layout}
        dashboard={Dashboard}
        loading={Loading}
        requireAuth
        disableTelemetry
      >
        <Resource name="dashboard" list={UserActivityDashboard} />
        <Resource name="user_activity" list={UserActivityList} />
        <Resource name="program" list={ProgramList} edit={ProgramEdit} />
        {/* <Resource name="agency" list={AgencyList} /> */}
        <CustomRoutes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
        </CustomRoutes>
      </Admin>
    </LocalizationProvider>
  )
}
