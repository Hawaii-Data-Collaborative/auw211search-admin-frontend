import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 15
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '7px 12px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          margin: 0
        },
        outlined: {
          fontSize: 15,
          transform: 'translate(12px, 7.5px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(13px, -8px) scale(0.75)'
          }
        }
      }
    }
  }
})
