import { Datagrid, List, TextInput, TextField } from 'react-admin'

export const ProgramList = () => {
  const filters = [
    <TextInput source="Name" label="Name" />,
    <TextInput source="Website__c" label="Website" />,
    <TextInput source="Service_Description__c" label="Service Description" />,
    <TextInput source="Program_Taxonomies__c" label="Program Taxonomies" />
  ]

  return (
    <List filters={filters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="Name" sx={{ minWidth: 250, display: 'inline-block' }} />
        <TextField source="Status__c" label="Status" />
        {/* <TextField source="Hours__c" label="Hours" /> */}
        {/* <TextField source="Program_Phone__c" label="Program_Phone" /> */}
        <TextField source="Website__c" label="Website" />
        <TextField source="Program_Taxonomies__c" label="Program Taxonomies" />
        <TextField
          source="Service_Description__c"
          label="Service Description"
          sx={{ minWidth: '30vw', display: 'inline-block' }}
        />
        <TextField source="CreatedDate" />
        <TextField source="LastModifiedDate" />
      </Datagrid>
    </List>
  )
}
