import {
  Datagrid,
  DateField,
  FilterList,
  FilterListItem,
  FunctionField,
  List,
  Pagination as RAPagination,
  TextField
} from 'react-admin'
import { Card, CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'

export const UserActivityList = () => {
  // const filters = [<SearchInput source="userId" />, <SearchInput source="event" />, <SearchInput source="data" />]

  return (
    <List aside={<FilterSidebar />} pagination={<Pagination />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="userId" />
        <TextField source="event" />
        <FunctionField source="data" render={renderData} />
        <DateField source="createdAt" showTime sx={{ display: 'inline-block', minWidth: 170 }} />
      </Datagrid>
    </List>
  )
}

function renderData(record) {
  let { data } = record
  if (!data) {
    return null
  }
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  let lines = []
  const keys = Object.keys(data).sort()
  for (const k of keys) {
    let v = data[k]
    if (typeof v === 'object') {
      let items = []
      for (const [k2, v2] of Object.entries(v)) {
        items.push(
          <tr key={k2}>
            <td style={{ color: '#778', verticalAlign: 'top' }}>
              <div style={{ paddingLeft: 20 }}>{k2}: </div>
            </td>
            <td style={{ verticalAlign: 'top' }}>{v2}</td>
          </tr>
        )
      }
      lines.push(
        <>
          <tr key={k}>
            <td style={{ color: '#778', verticalAlign: 'top' }}>{k}: </td>
          </tr>
          {items}
        </>
      )
    } else {
      lines.push(
        <tr key={k}>
          <td style={{ color: '#778', verticalAlign: 'top' }}>{k}: </td>
          <td style={{ verticalAlign: 'top' }}>{v}</td>
        </tr>
      )
    }
  }
  return (
    <table>
      <tbody>{lines}</tbody>
    </table>
  )
}

function Pagination() {
  return <RAPagination perPage={100} rowsPerPageOptions={[10, 25, 50, 100]} />
}

let _events
let _users

function FilterSidebar() {
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (_events) {
      setEvents(_events)
    } else {
      const fn = async () => {
        const res = await axios.get(API_URL + '/user_activity_events')
        const { data } = res
        if (data) {
          _events = data
        }
        setEvents(data)
      }
      fn()
    }
  }, [])

  useEffect(() => {
    if (_users) {
      setEvents(_users)
    } else {
      const fn = async () => {
        const res = await axios.get(API_URL + '/user_activity_users')
        const { data } = res
        if (data) {
          _users = data
        }
        setUsers(data)
      }
      fn()
    }
  }, [])

  const getIndent = eventName => {
    const visit = (eventName, indent = 0) => {
      let rv = indent
      const similarEventNames = events.filter(e => e !== eventName && eventName.includes(e))
      for (const similarEventName of similarEventNames) {
        rv = visit(similarEventName, indent + 2)
      }
      return rv
    }
    return visit(eventName, 0)
  }

  return (
    <Card sx={{ order: -1, mr: 2, mt: '64px', mb: '52px', width: 400 }}>
      <CardContent>
        {/* <SavedQueriesList /> */}
        {/* <FilterLiveSearch /> */}
        <FilterList label="Event">
          {events.map(e => (
            <FilterListItem key={e} label={e} value={{ event: e }} sx={{ pl: getIndent(e) }} />
          ))}
        </FilterList>
        <FilterList label="User">
          {users.map(u => (
            <FilterListItem key={u} label={u} value={{ userId: u }} sx={{ pl: getIndent(u) }} />
          ))}
        </FilterList>
      </CardContent>
    </Card>
  )
}
