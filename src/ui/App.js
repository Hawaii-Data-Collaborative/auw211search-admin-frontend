import './App.scss'

import {
  Admin,
  CustomRoutes,
  Resource,
  Layout as RALayout,
  Menu as RAMenu,
  useAuthState,
  useAuthProvider,
  defaultTheme
} from 'react-admin'
import { QueryClient } from 'react-query'
import { Route } from 'react-router-dom'
import { dataProvider as createDataProvider } from 'ra-data-simple-prisma'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EditNotificationsIcon from '@mui/icons-material/EditNotifications'
import GroupIcon from '@mui/icons-material/Group'
import StoreIcon from '@mui/icons-material/Store'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import PersonIcon from '@mui/icons-material/Person'
import TuneIcon from '@mui/icons-material/Tune'
import { authProvider } from '../authProvider'
import { UserActivityList } from './resources/userActivity'
// import { AgencyList } from './agency'
import { ProgramEdit, ProgramList } from './resources/program'
import { API_URL } from '../constants'
import { Settings } from './Settings'
import { Dashboard } from './Dashboard'
import { UserActivityDashboard } from './resources/dashboard'
import { Banner } from './Banner'
import { Categories } from './Categories'
import { Loading } from './Loading'
import { ResetPassword } from './ResetPassword'
import { LoginPage } from './LoginPage'
import { UserCreate, UserEdit, UserList } from './resources/user'
import { RoleCreate, RoleEdit, RoleList } from './resources/role'

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
        onFulfilled: config => {
          config.withCredentials = true
          return config
        }
      }
    ]
  }
})

const Menu = props => {
  const { authenticated } = useAuthState()
  const authProvider = useAuthProvider()
  const permissions = authProvider.getPermissionsSync()

  if (!authenticated) {
    return null
  }

  return (
    <RAMenu {...props}>
      <RAMenu.DashboardItem primaryText="Home" />
      <RAMenu.Item to="/banner" primaryText="Homepage Banner" leftIcon={<EditNotificationsIcon />} />
      {permissions.includes('UserActivity.View') && (
        <RAMenu.Item to="/dashboard" primaryText="User Activity - Dashboard" leftIcon={<GroupIcon />} />
      )}
      {permissions.includes('UserActivity.View') && (
        <RAMenu.Item to="/user_activity" primaryText="User Activity - List" leftIcon={<GroupIcon />} />
      )}
      {permissions.includes('Programs.View') && (
        <RAMenu.Item to="/program" primaryText="Programs" leftIcon={<StoreIcon />} />
      )}
      {/* <RAMenu.Item to="/agency" primaryText="Agencies" leftIcon={<BusinessIcon />} /> */}
      {permissions.includes('Categories.View') && (
        <RAMenu.Item to="/categories" primaryText="Categories" leftIcon={<AccountTreeIcon />} />
      )}
      {permissions.includes('Users.View') && <RAMenu.Item to="/user" primaryText="Users" leftIcon={<PersonIcon />} />}
      {permissions.includes('Roles.View') && <RAMenu.Item to="/role" primaryText="Roles" leftIcon={<TuneIcon />} />}
      {permissions.includes('Settings.Change') && (
        <RAMenu.Item to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
      )}
    </RAMenu>
  )
}

const Layout = props => <RALayout {...props} menu={Menu} />

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        queryClient={queryClient}
        layout={Layout}
        loginPage={LoginPage}
        dashboard={Dashboard}
        loading={Loading}
        theme={{
          ...defaultTheme,
          palette: {
            ...defaultTheme.palette,
            primary: { main: '#ffb351' },
            secondary: { main: '#005191' }
          }
        }}
        disableTelemetry
      >
        <Resource name="dashboard" list={UserActivityDashboard} />
        <Resource name="user_activity" list={UserActivityList} />
        <Resource name="program" list={ProgramList} edit={ProgramEdit} />
        <Resource name="user" list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name="role" list={RoleList} create={RoleCreate} edit={RoleEdit} />
        {/* <Resource name="agency" list={AgencyList} /> */}
        <CustomRoutes>
          <Route path="/banner" element={<Banner />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
        </CustomRoutes>
        <CustomRoutes noLayout>
          <Route path="/reset_password" element={<ResetPassword />} />
        </CustomRoutes>
      </Admin>
    </LocalizationProvider>
  )
}
