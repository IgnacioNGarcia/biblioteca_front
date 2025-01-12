import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { 
  LibraryBooks as LibraryIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
  House as HouseIcon,
  ChevronLeft as ChevronLeftIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../../styles/theme'; // Ajusta la ruta según tu estructura
import { useRouter } from 'next/router';

const drawerWidth = 250;

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const menuItems = [
    { text: 'Inicio', icon: <HouseIcon />, path: '/' },
    { text: 'Catálogo de Libros', icon: <LibraryIcon />, path: '/libros' },
    { text: 'Gestión de Socios', icon: <PeopleIcon />, path: '/socios' },
    { text: 'Gestión de Préstamos', icon: <AccessTimeIcon />, path: '/prestamos' },

  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Box sx={{ 
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Biblioteca Popular "Nora Bombelli"
            </Typography>
            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={handleThemeToggle}
            >
              {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : 65,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : 65,
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            px: [1]
          }}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text}
                  onClick={() => router.push(item.path)}
                  selected={router.pathname === item.path}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: (theme) => theme.palette.action.selected,
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.action.hover,
                      },
                    },
                    mb: 1,
                    mx: 1,
                    borderRadius: 1,
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: 'primary.main',
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
