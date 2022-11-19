import { AppBar } from 'react-admin'
import Typography from '@mui/material/Typography'
import logoSrc from '../assets/logo.svg'

export const Navbar = props => (
  <AppBar
    sx={{
      '& .RaAppBar-title': {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }
    }}
    {...props}
  >
    <img src={logoSrc} />

    <Typography variant="h6" color="inherit" id="react-admin-title" />
  </AppBar>
)
