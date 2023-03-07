import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  DatagridConfigurable,
  Edit,
  List,
  SimpleForm,
  TextInput,
  TextField,
  useRecordContext,
  Toolbar as RAToolbar,
  ToolbarClasses,
  SaveButton,
  TopToolbar,
  SelectColumnsButton,
  ExportButton,
  Pagination
} from 'react-admin'

const ProgramListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
)

const ProgramPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />

export const ProgramList = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const filters = [
    <TextInput source="q" label="Search" sx={matches ? { width: 500 } : undefined} alwaysOn resettable />
  ]

  return (
    <List filters={filters} actions={<ProgramListActions />} pagination={<ProgramPagination />}>
      <DatagridConfigurable rowClick="edit" bulkActionButtons={false} omit={omitColumns}>
        <TextField source="id" />
        <TextField source="Name" sx={{ minWidth: 250, display: 'inline-block' }} />
        <TextField source="keywords" />
        <TextField source="Status__c" label="Status" />
        <TextField source="Website__c" label="Website" />
        <TextField source="Program_Taxonomies__c" label="Program Taxonomies" />
        <TextField
          source="Service_Description__c"
          label="Service Description"
          sx={{ minWidth: '30vw', maxWidth: '50vw', display: 'inline-block' }}
        />
        <TextField source="CreatedDate" />
        <TextField source="LastModifiedDate" />
        <TextField source="OwnerId" />
        <TextField source="IsDeleted" />
        <TextField source="CreatedById" />
        <TextField source="LastModifiedById" />
        <TextField source="SystemModstamp" />
        <TextField source="LastActivityDate" />
        <TextField source="LastViewedDate" />
        <TextField source="LastReferencedDate" />
        <TextField source="Additional_Program_Information__c" />
        <TextField source="Age_Range_restrictions__c" />
        <TextField source="Criteria_for_Participation__c" />
        <TextField source="Description__c" />
        <TextField source="Family_Composition_restrictions__c" />
        <TextField source="Fees_Other__c" />
        <TextField source="Fees__c" />
        <TextField source="Gender_restrictions_Other__c" />
        <TextField source="Income_Status_restrictions__c" />
        <TextField source="Insurance_Other__c" />
        <TextField source="Medical_Insurance_Plans_Accepted__c" />
        <TextField source="Other_restrictions__c" />
        <TextField source="Program_Contact_Email__c" />
        <TextField source="Program_Contact_Fax__c" />
        <TextField source="Program_Contact_Name__c" />
        <TextField source="Program_Contact_Phone__c" />
        <TextField source="Program_Contact_Title__c" />
        <TextField source="Race_or_Ethnicity_restrictions__c" />
        <TextField source="of_Sites__c" />
        <TextField source="AKA_Name__c" />
        <TextField source="Accessibility__c" />
        <TextField source="Account__c" />
        <TextField source="Additional_Information__c" />
        <TextField source="Additional_Phones__c" />
        <TextField source="Eligibility__c" />
        <TextField source="Fax__c" />
        <TextField source="Fees_Text__c" />
        <TextField source="Group_Contact_10__c" />
        <TextField source="Group_Contact_1__c" />
        <TextField source="Group_Contact_2__c" />
        <TextField source="Group_Contact_3__c" />
        <TextField source="Group_Contact_4__c" />
        <TextField source="Group_Contact_5__c" />
        <TextField source="Group_Contact_6__c" />
        <TextField source="Group_Contact_7__c" />
        <TextField source="Group_Contact_8__c" />
        <TextField source="Group_Contact_9__c" />
        <TextField source="Hours__c" />
        <TextField source="Insurance__c" />
        <TextField source="Intake_Person__c" />
        <TextField source="Intake_Procedure__c" />
        <TextField source="Languages_Text__c" />
        <TextField source="Languages__c" />
        <TextField source="Legacy_Service_Area__c" />
        <TextField source="Location_ID__c" />
        <TextField source="Program_Email_Text__c" />
        <TextField source="Program_Email__c" />
        <TextField source="Program_Phone__c" />
        <TextField source="ServiceArea__c" />
        <TextField source="Service_Group__c" />
        <TextField source="Service_ID__c" />
        <TextField source="Target__c" />
        <TextField source="Taxonomy_10__c" />
        <TextField source="Taxonomy_1__c" />
        <TextField source="Taxonomy_2__c" />
        <TextField source="Taxonomy_3__c" />
        <TextField source="Taxonomy_4__c" />
        <TextField source="Taxonomy_5__c" />
        <TextField source="Taxonomy_6__c" />
        <TextField source="Taxonomy_7__c" />
        <TextField source="Taxonomy_8__c" />
        <TextField source="Taxonomy_9__c" />
        <TextField source="Transportation__c" />
        <TextField source="Unpublished__c" />
        <TextField source="of_Search_Terms__c" />
        <TextField source="Program_Phone_Text__c" />
        <TextField source="Target_Long__c" />
        <TextField source="Eligibility_Long__c" />
        <TextField source="Accessibility_Long__c" />
        <TextField source="X211_Agency__c" />
        <TextField source="Days_Since_Last_Update__c" />
        <TextField source="Program_Taxonomy_Rollup__c" />
        <TextField source="AccessibilityPicklist__c" />
        <TextField source="Accessibility_Other__c" />
        <TextField source="Age_Restriction_Other__c" />
        <TextField source="Age_Restrictions__c" />
        <TextField source="Business_Hours_Friday__c" />
        <TextField source="Business_Hours_Monday__c" />
        <TextField source="Business_Hours_Saturday__c" />
        <TextField source="Business_Hours_Sunday__c" />
        <TextField source="Business_Hours_Thursday__c" />
        <TextField source="Business_Hours_Tuesday__c" />
        <TextField source="Business_Hours_Wednesday__c" />
        <TextField source="Close_Time_Friday__c" />
        <TextField source="Close_Time_Monday__c" />
        <TextField source="Close_Time_Saturday__c" />
        <TextField source="Close_Time_Sunday__c" />
        <TextField source="Close_Time_Thursday__c" />
        <TextField source="Close_Time_Tuesday__c" />
        <TextField source="Close_Time_Wednesday__c" />
        <TextField source="CommunitiesServed__c" />
        <TextField source="Communities_Served_Other__c" />
        <TextField source="DocumentsRequiredPicklist__c" />
        <TextField source="Documents_Required_Other__c" />
        <TextField source="Gender_Restrictions__c" />
        <TextField source="Income_Restrictions_Other__c" />
        <TextField source="Income_Restrictions__c" />
        <TextField source="Intake_Procedure_Picklist__c" />
        <TextField source="Intake_Procedures_Other__c" />
        <TextField source="Languages_Consistently_Available__c" />
        <TextField source="Medical_Insurance_Types_Accepted__c" />
        <TextField source="Medical_Insurance_required__c" />
        <TextField source="Open_247__c" />
        <TextField source="Open_Time_Friday__c" />
        <TextField source="Open_Time_Monday__c" />
        <TextField source="Open_Time_Saturday__c" />
        <TextField source="Open_Time_Sunday__c" />
        <TextField source="Open_Time_Thursday__c" />
        <TextField source="Open_Time_Tuesday__c" />
        <TextField source="Open_Time_Wednesday__c" />
        <TextField source="Program_Special_Notes_Hours__c" />
        <TextField source="Race_Restrictions__c" />
        <TextField source="Race_or_Ethnicity_restrictions_other__c" />
        <TextField source="Site_Address__c" />
        <TextField source="Site_Name__c" />
        <TextField source="Site_Program_Changes__c" />
        <TextField source="Transportation_Description__c" />
        <TextField source="Transportation_Services_Offered__c" />
        <TextField source="attributes" />
      </DatagridConfigurable>
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

const omitColumns = [
  'keywords',
  'OwnerId',
  'IsDeleted',
  'CreatedDate',
  'CreatedById',
  'LastModifiedDate',
  'LastModifiedById',
  'SystemModstamp',
  'LastActivityDate',
  'LastViewedDate',
  'LastReferencedDate',
  'Additional_Program_Information__c',
  'Age_Range_restrictions__c',
  'Criteria_for_Participation__c',
  'Description__c',
  'Family_Composition_restrictions__c',
  'Fees_Other__c',
  'Fees__c',
  'Gender_restrictions_Other__c',
  'Income_Status_restrictions__c',
  'Insurance_Other__c',
  'Medical_Insurance_Plans_Accepted__c',
  'Other_restrictions__c',
  'Program_Contact_Email__c',
  'Program_Contact_Fax__c',
  'Program_Contact_Name__c',
  'Program_Contact_Phone__c',
  'Program_Contact_Title__c',
  'Race_or_Ethnicity_restrictions__c',
  'Status__c',
  'of_Sites__c',
  'AKA_Name__c',
  'Accessibility__c',
  'Account__c',
  'Additional_Information__c',
  'Additional_Phones__c',
  'Eligibility__c',
  'Fax__c',
  'Fees_Text__c',
  'Group_Contact_10__c',
  'Group_Contact_1__c',
  'Group_Contact_2__c',
  'Group_Contact_3__c',
  'Group_Contact_4__c',
  'Group_Contact_5__c',
  'Group_Contact_6__c',
  'Group_Contact_7__c',
  'Group_Contact_8__c',
  'Group_Contact_9__c',
  'Hours__c',
  'Insurance__c',
  'Intake_Person__c',
  'Intake_Procedure__c',
  'Languages_Text__c',
  'Languages__c',
  'Legacy_Service_Area__c',
  'Location_ID__c',
  'Program_Email_Text__c',
  'Program_Email__c',
  'Program_Phone__c',
  'Program_Taxonomies__c',
  'ServiceArea__c',
  'Service_Group__c',
  'Service_ID__c',
  'Target__c',
  'Taxonomy_10__c',
  'Taxonomy_1__c',
  'Taxonomy_2__c',
  'Taxonomy_3__c',
  'Taxonomy_4__c',
  'Taxonomy_5__c',
  'Taxonomy_6__c',
  'Taxonomy_7__c',
  'Taxonomy_8__c',
  'Taxonomy_9__c',
  'Transportation__c',
  'Unpublished__c',
  'of_Search_Terms__c',
  'Program_Phone_Text__c',
  'Target_Long__c',
  'Eligibility_Long__c',
  'Accessibility_Long__c',
  'X211_Agency__c',
  'Days_Since_Last_Update__c',
  'Program_Taxonomy_Rollup__c',
  'AccessibilityPicklist__c',
  'Accessibility_Other__c',
  'Age_Restriction_Other__c',
  'Age_Restrictions__c',
  'Business_Hours_Friday__c',
  'Business_Hours_Monday__c',
  'Business_Hours_Saturday__c',
  'Business_Hours_Sunday__c',
  'Business_Hours_Thursday__c',
  'Business_Hours_Tuesday__c',
  'Business_Hours_Wednesday__c',
  'Close_Time_Friday__c',
  'Close_Time_Monday__c',
  'Close_Time_Saturday__c',
  'Close_Time_Sunday__c',
  'Close_Time_Thursday__c',
  'Close_Time_Tuesday__c',
  'Close_Time_Wednesday__c',
  'CommunitiesServed__c',
  'Communities_Served_Other__c',
  'DocumentsRequiredPicklist__c',
  'Documents_Required_Other__c',
  'Gender_Restrictions__c',
  'Income_Restrictions_Other__c',
  'Income_Restrictions__c',
  'Intake_Procedure_Picklist__c',
  'Intake_Procedures_Other__c',
  'Languages_Consistently_Available__c',
  'Medical_Insurance_Types_Accepted__c',
  'Medical_Insurance_required__c',
  'Open_247__c',
  'Open_Time_Friday__c',
  'Open_Time_Monday__c',
  'Open_Time_Saturday__c',
  'Open_Time_Sunday__c',
  'Open_Time_Thursday__c',
  'Open_Time_Tuesday__c',
  'Open_Time_Wednesday__c',
  'Program_Special_Notes_Hours__c',
  'Race_Restrictions__c',
  'Race_or_Ethnicity_restrictions_other__c',
  'Site_Address__c',
  'Site_Name__c',
  'Site_Program_Changes__c',
  'Transportation_Description__c',
  'Transportation_Services_Offered__c',
  'attributes'
]
