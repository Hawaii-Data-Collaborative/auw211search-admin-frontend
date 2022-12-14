import {
  Datagrid,
  Edit,
  List,
  SimpleForm,
  TextInput,
  TextField,
  useRecordContext,
  Toolbar as RAToolbar,
  ToolbarClasses,
  SaveButton
} from 'react-admin'

export const ProgramList = () => {
  const filters = [
    <TextInput source="Name" label="Name" />,
    <TextInput source="Website__c" label="Website" />,
    <TextInput source="Service_Description__c" label="Service Description" />,
    <TextInput source="Program_Taxonomies__c" label="Program Taxonomies" />
  ]

  return (
    <List filters={filters}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
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

const Title = () => {
  const record = useRecordContext()
  return record?.Name || 'Edit Program'
}

export const ProgramEdit = () => (
  <Edit title={<Title />} redirect={false} mutationMode="pessimistic">
    <SimpleForm toolbar={<Toolbar />}>
      <TextInput source="Name" sx={{ maxWidth: 600 }} fullWidth />
      <TextInput
        source="keywords"
        label="Keywords (separated by semicolon)"
        placeholder="Example:  food;kitchen;soup"
        sx={{ maxWidth: 600 }}
        fullWidth
      />
    </SimpleForm>
  </Edit>
)

const Toolbar = () => (
  <RAToolbar>
    <div className={ToolbarClasses.defaultToolbar}>
      <SaveButton />
    </div>
  </RAToolbar>
)
