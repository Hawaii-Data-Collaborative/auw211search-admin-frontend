import { Chip } from '@mui/material'
import {
  CheckboxGroupInput,
  Create,
  Datagrid,
  Edit,
  FunctionField,
  List,
  SimpleForm,
  TextField,
  TextInput,
  useAuthProvider,
  usePermissions,
  useRecordContext
} from 'react-admin'

import './role.scss'

const permissions = [
  'UserActivity.View',
  'Programs.View',
  'Programs.Change',
  'Categories.View',
  'Categories.Change',
  'Users.View',
  'Users.Change',
  'Roles.View',
  'Roles.Change',
  'Settings.Change'
].map(name => ({ id: name, name }))

export const RoleList = () => {
  usePermissions()
  const authProvider = useAuthProvider()
  const permissions = authProvider.getPermissionsSync()
  const canEdit = permissions.includes('Roles.Change')

  return (
    <List actions={canEdit ? undefined : <div style={{ height: 50 }} />}>
      <Datagrid rowClick={canEdit ? 'edit' : undefined} bulkActionButtons={null}>
        <TextField source="name" />
        <TextField source="description" />
        <FunctionField
          headerClassName="column-permissions"
          cellClassName="column-permissions"
          label="Permissions"
          render={role => {
            let perms = role.permissions
            if (typeof perms === 'string') {
              perms = perms.split(';')
            }
            if (!Array.isArray(perms)) {
              return null
            }
            return perms.map(p => <Chip key={p} label={p} sx={{ mr: 1, mb: 1 }} />)
          }}
        />
      </Datagrid>
    </List>
  )
}

const RoleTitle = () => {
  const role = useRecordContext()
  return <span>{role?.name || 'New Role'}</span>
}

export const RoleEdit = () => (
  <Edit title={<RoleTitle />} mutationMode="pessimistic">
    <SimpleForm sx={{ maxWidth: 500 }}>
      <TextInput source="name" fullWidth />
      <TextInput source="description" label="Description (optional)" fullWidth multiline minRows={3} />
      <CheckboxGroupInput
        source="permissions"
        choices={permissions}
        sx={{
          '.MuiFormGroup-root': {
            display: 'block'
          },
          '.MuiFormControlLabel-root': {
            display: 'block'
          }
        }}
      />
    </SimpleForm>
  </Edit>
)

export const RoleCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm sx={{ maxWidth: 500 }}>
        <TextInput source="name" fullWidth />
        <TextInput source="description" label="Description (optional)" fullWidth multiline minRows={3} />
        <CheckboxGroupInput
          source="permissions"
          choices={permissions}
          sx={{
            '.MuiFormGroup-root': {
              display: 'block'
            },
            '.MuiFormControlLabel-root': {
              display: 'block'
            }
          }}
        />
      </SimpleForm>
    </Create>
  )
}
