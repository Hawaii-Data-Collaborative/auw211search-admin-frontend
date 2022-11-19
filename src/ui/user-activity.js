import { Datagrid, DateField, List, TextField, SearchInput } from 'react-admin'

export const UserActivityList = () => {
  const filters = [<SearchInput source="userId" />, <SearchInput source="event" />, <SearchInput source="data" />]

  return (
    <List filters={filters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="userId" />
        <TextField source="event" />
        <TextField source="data" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}
