import React from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Importación dinámica de Lottie sin SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import checkAnimation from "../../assets/animations/check-animation.json";

interface Socio {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaAlta: string;
}

export default function AgregarSocioPage() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Socio, string>>>({});
  const [socio, setSocio] = React.useState<Partial<Socio>>({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaAlta: new Date().toISOString().split('T')[0]
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Socio, string>> = {};
    
    // Validación nombre y apellido
    if (!socio.nombre?.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (!/^[A-Za-zÁ-ÿ\s]{2,50}$/.test(socio.nombre.trim())) {
      newErrors.nombre = 'Ingrese un nombre válido (solo letras)';
    }

    if (!socio.apellido?.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    } else if (!/^[A-Za-zÁ-ÿ\s]{2,50}$/.test(socio.apellido.trim())) {
      newErrors.apellido = 'Ingrese un apellido válido (solo letras)';
    }

    // Validación DNI
    if (!socio.dni?.trim()) {
      newErrors.dni = 'El DNI es requerido';
    } else if (!/^\d{5,9}$/.test(socio.dni.trim())) {
      newErrors.dni = 'El DNI debe tener entre 5 y 9 dígitos';
    }

    // Validación email
    if (!socio.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(socio.email.trim())) {
      newErrors.email = 'Ingrese un email válido';
    }

    // Validación teléfono
    if (!socio.telefono?.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(socio.telefono.trim())) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    // Validación dirección
    if (!socio.direccion?.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (socio.direccion.trim().length < 5) {
      newErrors.direccion = 'La dirección debe tener al menos 5 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof Socio, value: string) => {
    setSocio(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const handleGuardar = () => {
    if (validateForm()) {
      setOpenDialog(true);
    }
  };

  const handleContinuar = () => {
    router.push('/socios');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ mb: 4, color: 'text.primary', textAlign: 'center' }}>
        Agregar Socio
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Nombre" 
              fullWidth
              required
              value={socio.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              error={!!errors.nombre}
              helperText={errors.nombre}
              inputProps={{ 
                maxLength: 50,
                pattern: '[A-Za-zÁ-ÿ\\s]*'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Apellido" 
              fullWidth
              required
              value={socio.apellido}
              onChange={(e) => handleInputChange('apellido', e.target.value)}
              error={!!errors.apellido}
              helperText={errors.apellido}
              inputProps={{ 
                maxLength: 50,
                pattern: '[A-Za-zÁ-ÿ\\s]*'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="DNI" 
              fullWidth
              required
              value={socio.dni}
              onChange={(e) => handleInputChange('dni', e.target.value)}
              error={!!errors.dni}
              helperText={errors.dni}
              inputProps={{ 
                maxLength: 9,
                pattern: '\\d*'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Email" 
              fullWidth
              required
              type="email"
              value={socio.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Teléfono" 
              fullWidth
              required
              value={socio.telefono}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              error={!!errors.telefono}
              helperText={errors.telefono}
              inputProps={{ 
                maxLength: 10,
                pattern: '\\d*'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Dirección" 
              fullWidth
              required
              value={socio.direccion}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              error={!!errors.direccion}
              helperText={errors.direccion}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => router.push('/socios')}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleGuardar}>
                Guardar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
            minWidth: '300px'
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          pt: 2 
        }}>
          <Box sx={{ width: 150, height: 150} }>
            <Lottie 
              animationData={checkAnimation} 
              loop={true}
              autoplay={true}
            />
          </Box>
        </Box>
        <DialogTitle sx={{ 
          textAlign: 'center',
          pt: 1,
          pb: 3
        }}>
          ¡Socio guardado exitosamente!
        </DialogTitle>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: 3 
        }}>
          <Button 
            variant="contained"
            onClick={handleContinuar}
            autoFocus
            sx={{
              minWidth: '120px'
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}