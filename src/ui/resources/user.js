import {
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  ReferenceArrayInput,
  SelectArrayInput,
  SimpleForm,
  TextField,
  TextInput,
  useAuthProvider,
  useNotify,
  usePermissions,
  useRecordContext
} from 'react-admin'
import { BASE_URL } from '../../constants'

export const UserList = () => {
  usePermissions()
  const authProvider = useAuthProvider()
  const permissions = authProvider.getPermissionsSync()
  const canEdit = permissions.includes('Users.Change')

  return (
    <List actions={canEdit ? undefined : <div style={{ height: 50 }} />}>
      <Datagrid rowClick={canEdit ? 'edit' : undefined} bulkActionButtons={null}>
        <TextField source="email" />
        <DateField source="lastLogin" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  )
}

const UserTitle = () => {
  const user = useRecordContext()
  return <span>{user?.email}</span>
}

export const UserEdit = () => (
  <Edit title={<UserTitle />} mutationMode="pessimistic">
    <SimpleForm sx={{ maxWidth: 500 }}>
      <TextInput source="email" fullWidth />
      <ReferenceArrayInput source="roleIds" reference="role">
        <SelectArrayInput />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)

export const UserCreate = () => {
  const notify = useNotify()

  const onSuccess = data => {
    notify(`User created. A link was sent to ${data.email} so they can activate their account.`)
    setTimeout(() => {
      window.location = BASE_URL + '#/user'
      window.location.reload()
    }, 2000)
  }

  return (
    <Create title="Invite User" mutationOptions={{ onSuccess }}>
      <SimpleForm sx={{ maxWidth: 500 }}>
        <TextInput source="email" fullWidth />
        <ReferenceArrayInput source="roleIds" reference="role">
          <SelectArrayInput />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  )
}
