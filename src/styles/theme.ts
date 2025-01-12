import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#606c38', // Verde oliva - Color principal
      dark: '#283618', // Verde oscuro - Para hover y énfasis
    },
    background: {
      default: '#fefae0', // Color crema para el fondo
      paper: '#fff',  // Blanco - Fondo de componentes
    },
    text: {
      primary: '#283618', // Verde oscuro - Texto principal
      secondary: '#606c38', // Verde oliva - Texto secundario
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fefae0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          borderRadius: 8,
          backgroundColor: '#fff',
          color: '#283618',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#606c38',
          color: '#fefae0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#fff',
          color: '#283618',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fefae0', // Fondo crema para el drawer
          color: '#283618',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#dda15e', // Color naranja para la barra superior
          color: '#283618',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          borderWidth: 5,
          borderColor: '#606c38',
          // Hover
          '&:hover fieldset': {
            borderColor: '#283618', 
          },
          // Focused
          '&.Mui-focused fieldset': {
            borderColor: '#283618', // Mantener el violeta cuando está enfocado
          },
        // Color del label cuando está enfocado
        '& label.Mui-focused': {
          color: '#283618',
        }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
        contained: {
          backgroundColor: '#606c38', // Verde oliva para botones principales
          color: '#fefae0',
          '&:hover': {
            backgroundColor: '#283618', // Verde oscuro en hover
          },
        },
        outlined: {
          borderColor: '#606c38',
          color: '#606c38',
          '&:hover': {
            backgroundColor: 'rgba(96, 108, 56, 0.1)', // Verde oliva con transparencia
            borderColor: '#283618',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#fefae0', // Fondo crema cuando está seleccionado
            '&:hover': {
              backgroundColor: '#dda15e', // Naranja claro al pasar el cursor
            },
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Activa el modo oscuro
    primary: {
      main: '#6366f1', // Color principal (íconos o botones destacados)
    },
    background: {
      default: '#202124', // Fondo principal (gris oscuro)
      paper: '#27272a',  // Fondo de componentes
    },
    text: {
      primary: '#e8eaed', // Texto principal (blanco suave)
      secondary: '#b0b3b8', // Texto secundario (gris claro)
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', // Sombra sutil
          borderRadius: 8,
          backgroundColor: '#27272a', // Fondo acorde al tema
          color: '#e8eaed', // Texto en Paper
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          borderWidth: 5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            // Estilo normal
            '& fieldset': {
              borderColor: '#6366f1',
            },
            // Hover
            '&:hover fieldset': {
              borderColor: '#4f46e5', // Color violeta en hover
            },
            // Focused
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1', // Mantener el violeta cuando está enfocado
            },
          },
          // Color del label cuando está enfocado
          '& label.Mui-focused': {
            color: '#6366f1',
          }
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderWidth: 5,
          borderColor: '#606c38',
          '& fieldset': {
              borderColor: '#6366f1',
            },
          '&:hover fieldset': {
            borderColor: '#283618',
          },
          '& label.Mui-focused': {
            color: '#6366f1',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#283618',
            borderWidth: 5,
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#27272a', // Fondo del Card
          color: '#e8eaed', // Texto en Card
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#27272a', // Fondo del Drawer
          color: '#000', // Texto en el Drawer
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#27272a', // Fondo de la AppBar
          color: '#e8eaed', // Texto de la AppBar
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Texto sin mayúsculas
          borderRadius: 6, // Bordes redondeados
        },
        contained: {
          backgroundColor: '#6366f1', // Fondo de botones "contained"
          color: '#fff', // Texto blanco
          '&:hover': {
            backgroundColor: '#4f46e5', // Fondo al hacer hover
          },
        },
        outlined: {
          borderColor: '#6366f1', // Borde de botones "outlined"
          color: '#6366f1',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.1)', // Fondo al hacer hover
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#6366f1', // Fondo cuando está seleccionado
            '&:hover': {
              backgroundColor: '#4f46e5', // Fondo al pasar el cursor
            },
          },
        },
      },
    },
  },
});
