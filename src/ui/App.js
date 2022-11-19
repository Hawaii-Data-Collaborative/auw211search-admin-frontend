import './App.scss'

import { Admin, Resource } from 'react-admin'
import { QueryClient } from 'react-query'
import { dataProvider } from 'ra-data-simple-prisma'
import GroupIcon from '@mui/icons-material/Group'
import BusinessIcon from '@mui/icons-material/Business'
import StoreIcon from '@mui/icons-material/Store'
import { authProvider } from '../authProvider'
import { UserActivityList } from './user-activity'
import { AgencyList } from './agency'
import { ProgramList } from './program'
import { API_URL } from '../constants'

// import { Main } from './Main'
// import { Nav } from './Nav'

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

export function App() {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider(API_URL)} queryClient={queryClient}>
      <Resource name="user_activity" list={UserActivityList} icon={GroupIcon} />
      <Resource name="agency" list={AgencyList} icon={BusinessIcon} />
      <Resource name="program" list={ProgramList} icon={StoreIcon} />
    </Admin>
  )
  // return (
  //   <div className="App">
  //     <Nav />
  //     <Main />
  //   </div>
  // )
}
