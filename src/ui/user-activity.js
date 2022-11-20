import { Datagrid, DateField, FilterList, FilterListItem, FunctionField, List, TextField } from 'react-admin'
import { Card, CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'

export const UserActivityList = () => {
  // const filters = [<SearchInput source="userId" />, <SearchInput source="event" />, <SearchInput source="data" />]

  return (
    <List aside={<FilterSidebar />}>
      <Datagrid rowClick="edit">
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
  for (const [k, v] of Object.entries(data)) {
    lines.push(
      <tr key={k}>
        <td style={{ color: '#778', verticalAlign: 'top' }}>{k}: </td>
        <td style={{ verticalAlign: 'top' }}>{v}</td>
      </tr>
    )
  }
  return (
    <table>
      <tbody>{lines}</tbody>
    </table>
  )
}

let _events

function FilterSidebar() {
  const [events, setEvents] = useState([])

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

  return (
    <Card sx={{ order: -1, mr: 2, mt: '64px', width: 300 }}>
      <CardContent>
        {/* <SavedQueriesList /> */}
        {/* <FilterLiveSearch /> */}
        <FilterList label="Event">
          {events.map(e => (
            <FilterListItem key={e} label={e} value={{ event: e }} />
          ))}
        </FilterList>
      </CardContent>
    </Card>
  )
}
