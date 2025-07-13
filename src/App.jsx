import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ContactList from './components/ContactList';

const colorPalettes = {
  blue: {
    primary: { main: '#2563eb', light: '#60a5fa', dark: '#1e40af' }, // Modern blue
    secondary: { main: '#f59e42', light: '#fcd34d', dark: '#b45309' }, // Amber/orange accent
  },
  green: {
    primary: { main: '#10b981', light: '#6ee7b7', dark: '#047857' }, // Emerald
    secondary: { main: '#6366f1', light: '#a5b4fc', dark: '#3730a3' }, // Indigo accent
  },
  purple: {
    primary: { main: '#6366f1', light: '#a5b4fc', dark: '#3730a3' }, // Indigo
    secondary: { main: '#f59e42', light: '#fcd34d', dark: '#b45309' }, // Amber accent
  },
  orange: {
    primary: { main: '#f59e42', light: '#fcd34d', dark: '#b45309' }, // Amber
    secondary: { main: '#2563eb', light: '#60a5fa', dark: '#1e40af' }, // Blue accent
  },
};

const getDesignTokens = (mode, paletteKey = 'blue') => {
  const palette = colorPalettes[paletteKey] || colorPalettes.blue;
  return {
    palette: {
      mode,
      primary: palette.primary,
      secondary: palette.secondary,
      background: {
        default: mode === 'dark' ? '#181c24' : '#f5f5f5',
        paper: mode === 'dark' ? '#232936' : '#fff',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            // Prevent layout shift on focus/active
            boxShadow: 'none',
            border: '2px solid transparent',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:focus, &:active': {
              outline: 'none',
              borderColor: '#a5b4fc', // subtle focus border (indigo)
              boxShadow: '0 0 0 2px #a5b4fc33', // soft focus ring
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            border: '2px solid transparent',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:focus, &:active': {
              outline: 'none',
              borderColor: '#a5b4fc',
              boxShadow: '0 0 0 2px #a5b4fc33',
            },
          },
        },
      },
    },
  };
};

function App() {
  const [mode, setMode] = useState('light');
  const [paletteKey, setPaletteKey] = useState('blue');
  const [anchorEl, setAnchorEl] = useState(null);
  const [paletteMenu, setPaletteMenu] = useState(null);
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, paletteKey)),
    [mode, paletteKey]
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    handleClose();
  };
  const handlePaletteMenu = (event) => {
    setPaletteMenu(event.currentTarget);
  };
  const handlePaletteChange = (key) => {
    setPaletteKey(key);
    setPaletteMenu(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Prevent layout shift by always reserving space for the scrollbar */}
      <style>{`body { overflow-y: scroll !important; scrollbar-gutter: stable !important; }`}</style>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: '1rem', borderRadius: 8 },
          success: { style: { background: '#43a047', color: '#fff' } },
          error: { style: { background: '#d32f2f', color: '#fff' } },
        }}
      />
      <AppBar position="static" color="primary" elevation={2} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}
          >
            Modern Contacts
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              color="inherit"
              onClick={handlePaletteMenu}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Theme
            </Button>
            <Menu
              anchorEl={paletteMenu}
              open={Boolean(paletteMenu)}
              onClose={() => setPaletteMenu(null)}
              disableScrollLock
            >
              {Object.keys(colorPalettes).map((key) => (
                <MenuItem
                  key={key}
                  selected={paletteKey === key}
                  onClick={() => handlePaletteChange(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={handleToggleMode}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: 'inherit', fontWeight: 500 }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </Typography>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleToggleMode}>
              <Switch checked={mode === 'dark'} onChange={handleToggleMode} />
              {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'background 0.3s',
        }}
      >
        <ContactList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
