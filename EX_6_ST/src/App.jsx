import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Contact from './componentYup/Contact'

// One accent (burnt orange, white text on it passes AA), stone neutrals, one 12px radius everywhere.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#c2410c' },
    error: { main: '#b91c1c' },
    background: { default: '#fafaf9', paper: '#ffffff' },
    text: { primary: '#1c1917', secondary: '#57534e' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          transition: 'transform 150ms ease, background-color 150ms ease',
          '&:active': { transform: 'scale(0.98)' },
        },
      },
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Contact />
    </ThemeProvider>
  )
}
