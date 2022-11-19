import { Datagrid, DateField, List, TextField } from 'react-admin'

export const AgencyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <TextField source="Overview__c" label="Overview" />
      <TextField source="Website" />
      <TextField source="Email__c" label="Email" />
      <TextField source="Status__c" label="Status" />
      <DateField source="CreatedDate" />
      <DateField source="LastModifiedDate" />
    </Datagrid>
  </List>
)
