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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField as MuiTextField,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { librosMock, sociosMock } from "../../utils/mockData";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import checkAnimation from "../../assets/animations/check-animation.json";

interface Prestamo {
  id: number;
  libroId: number;
  socioId: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: string;
}

export default function AgregarPrestamoPage() {
  const router = useRouter();
  const { socioId } = router.query;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Prestamo, string>>>({});
  const [prestamo, setPrestamo] = React.useState<Partial<Prestamo>>({
    libroId: 0,
    socioId: 0,
    fechaPrestamo: new Date().toISOString().split('T')[0],
    fechaDevolucion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estado: 'Pendiente'
  });
  const [libroSearch, setLibroSearch] = React.useState<string>('');
  const [socioSearch, setSocioSearch] = React.useState<string>('');

  const socioPreseleccionado = React.useMemo(() => 
    socioId ? sociosMock.find(s => s.id === Number(socioId)) : null,
    [socioId]
  );

  React.useEffect(() => {
    if (socioPreseleccionado) {
      setPrestamo(prev => ({
        ...prev,
        socioId: socioPreseleccionado.id
      }));
    }
  }, [socioPreseleccionado]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Prestamo, string>> = {};
    
    if (!prestamo.libroId) {
      newErrors.libroId = 'Debe seleccionar un libro';
    }

    if (!prestamo.socioId) {
      newErrors.socioId = 'Debe seleccionar un socio';
    }

    if (!prestamo.fechaPrestamo) {
      newErrors.fechaPrestamo = 'La fecha de préstamo es requerida';
    }

    if (!prestamo.fechaDevolucion) {
      newErrors.fechaDevolucion = 'La fecha de devolución es requerida';
    } else {
      try {
        const fechaPrestamo = prestamo.fechaPrestamo ? new Date(prestamo.fechaPrestamo) : new Date();
        const fechaDevolucion = new Date(prestamo.fechaDevolucion);
        
        if (isNaN(fechaPrestamo.getTime()) || isNaN(fechaDevolucion.getTime())) {
          newErrors.fechaDevolucion = 'Fechas inválidas';
        } else if (fechaDevolucion < fechaPrestamo) {
          newErrors.fechaDevolucion = 'La fecha de devolución debe ser posterior a la fecha de préstamo';
        }
      } catch (error) {
        newErrors.fechaDevolucion = 'Error al validar las fechas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof Prestamo, value: any) => {
    setPrestamo(prev => ({...prev, [field]: value}));
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
    if (socioId) {
      router.push(`/socios/${socioId}`);
    } else {
      router.push("/prestamos");
    }
  };

  const librosDisponibles = React.useMemo(() => 
    librosMock.filter(libro => 
      libro.disponible && 
      (!libroSearch || libro.titulo.toLowerCase().includes(libroSearch.toLowerCase()))
    ),
    [libroSearch]
  );

  const sociosFiltrados = React.useMemo(() => 
    sociosMock.filter(socio => 
      !socioSearch || 
      socio.nombre.toLowerCase().includes(socioSearch.toLowerCase()) ||
      socio.apellido.toLowerCase().includes(socioSearch.toLowerCase()) ||
      socio.dni.includes(socioSearch)
    ),
    [socioSearch]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h3"
        sx={{ mb: 4, color: "text.primary", textAlign: "center" }}
      >
        Agregar Préstamo
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={librosDisponibles}
              getOptionLabel={(option) => option.titulo}
              value={librosDisponibles.find(libro => libro.id === prestamo.libroId) || null}
              onChange={(_, newValue) => {
                handleInputChange('libroId', newValue?.id || 0);
              }}
              onInputChange={(_, newInputValue) => {
                setLibroSearch(newInputValue);
              }}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Libro"
                  required
                  error={!!errors.libroId}
                  helperText={errors.libroId}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {option.titulo}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Autor: {option.autor}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ISBN: {option.isbn}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Editorial: {option.editorial}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: option.disponible ? 'success.main' : 'error.main',
                          fontWeight: 'medium'
                        }}
                      >
                        {option.disponible ? '✓ Disponible' : '✗ No disponible'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {`Id Libro: ${option.id}`}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              )}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={sociosFiltrados}
              getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
              value={socioPreseleccionado || sociosFiltrados.find(socio => socio.id === prestamo.socioId) || null}
              onChange={(_, newValue) => {
                handleInputChange('socioId', newValue?.id || 0);
              }}
              onInputChange={(_, newInputValue) => {
                setSocioSearch(newInputValue);
              }}
              disabled={!!socioId}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Socio"
                  required
                  error={!!errors.socioId}
                  helperText={errors.socioId}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {`${option.nombre} ${option.apellido}`}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        DNI: {option.dni}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Email: {option.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Tel: {option.telefono}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Dirección: {option.direccion}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Préstamo"
              type="date"
              fullWidth
              required
              value={prestamo.fechaPrestamo}
              onChange={(e) => handleInputChange('fechaPrestamo', e.target.value)}
              error={!!errors.fechaPrestamo}
              helperText={errors.fechaPrestamo}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Devolución"
              type="date"
              fullWidth
              required
              value={prestamo.fechaDevolucion}
              onChange={(e) => handleInputChange('fechaDevolucion', e.target.value)}
              error={!!errors.fechaDevolucion}
              helperText={errors.fechaDevolucion}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => router.push("/prestamos")}>
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
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
            minWidth: "300px",
          },
        }}
      >
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          pt: 2 
        }}>
          <Box sx={{ width: 150, height: 150 }}>
            <Lottie
              animationData={checkAnimation}
              loop={false}
              autoplay={true}
            />
          </Box>
        </Box>
        <DialogTitle sx={{ 
          textAlign: "center",
          pt: 1,
          pb: 3
        }}>
          ¡Préstamo guardado exitosamente!
        </DialogTitle>
        <DialogActions sx={{ 
          justifyContent: "center",
          pb: 3
        }}>
          <Button
            variant="contained"
            onClick={handleContinuar}
            autoFocus
            sx={{
              minWidth: "120px",
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 