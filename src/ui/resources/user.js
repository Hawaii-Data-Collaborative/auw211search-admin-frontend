import {
  Create,
  Datagrid,
  DateField,
  Edit,
  EmailField,
  List,
  SimpleForm,
  TextInput,
  useNotify,
  useRecordContext
} from 'react-admin'

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <EmailField source="email" />
      <DateField source="lastLogin" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
)

const UserTitle = () => {
  const user = useRecordContext()
  return <span>{user.email}</span>
}

export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm sx={{ maxWidth: 500 }}>
      <TextInput source="email" fullWidth />
    </SimpleForm>
  </Edit>
)

export const UserCreate = () => {
  const notify = useNotify()

  const onSuccess = data => {
    notify(`User created. A link was sent to ${data.email} so they can activate their account.`)
    setTimeout(() => {
      window.location = '/#/user'
      window.location.reload()
    }, 2000)
  }

  return (
    <Create title="Invite User" mutationOptions={{ onSuccess }}>
      <SimpleForm sx={{ maxWidth: 500 }}>
        <TextInput source="email" fullWidth />
      </SimpleForm>
    </Create>
  )
}
