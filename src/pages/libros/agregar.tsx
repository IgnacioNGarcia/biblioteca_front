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
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Importación dinámica de Lottie sin SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import checkAnimation from "../../assets/animations/check-animation.json";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: string;
  pais: string;
  editorial: string;
  isbn: string;
  descripcion: string;
}

export default function AgregarLibroPage() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Libro, string>>>({});
  const [libro, setLibro] = React.useState<Partial<Libro>>({
    titulo: '',
    autor: '',
    anio: '',
    pais: '',
    editorial: '',
    isbn: '',
    descripcion: ''
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Libro, string>> = {};
    
    // Validaciones de campos requeridos
    if (!libro.titulo?.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    
    if (!libro.autor?.trim()) {
      newErrors.autor = 'El autor es requerido';
    }

    // Validación del año
    if (!libro.anio) {
      newErrors.anio = 'El año es requerido';
    } else if (!/^\d{4}$/.test(libro.anio)) {
      newErrors.anio = 'Ingrese un año válido (YYYY)';
    } else {
      const year = parseInt(libro.anio);
      const currentYear = new Date().getFullYear();
      if (year < 1000 || year > currentYear) {
        newErrors.anio = `El año debe estar entre 1000 y ${currentYear}`;
      }
    }

    // Validación del ISBN
    if (libro.isbn && !/^(?:\d{10}|\d{13})$/.test(libro.isbn)) {
      newErrors.isbn = 'El ISBN debe tener 10 o 13 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = () => {
    if (validateForm()) {
      setOpenDialog(true);
    }
  };

  const handleInputChange = (field: keyof Libro, value: string) => {
    setLibro(prev => ({...prev, [field]: value}));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const handleContinuar = () => {
    router.push("/libros");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h3"
        sx={{ mb: 4, color: "text.primary", textAlign: "center" }}
      >
        Agregar Libro
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Título" 
              fullWidth
              required
              value={libro.titulo}
              onChange={(e) => handleInputChange('titulo', e.target.value)}
              error={!!errors.titulo}
              helperText={errors.titulo}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Año" 
              fullWidth
              required
              value={libro.anio}
              onChange={(e) => handleInputChange('anio', e.target.value)}
              error={!!errors.anio}
              helperText={errors.anio}
              inputProps={{ 
                maxLength: 4,
                pattern: '\\d*'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Autor" 
              fullWidth
              required
              value={libro.autor}
              onChange={(e) => handleInputChange('autor', e.target.value)}
              error={!!errors.autor}
              helperText={errors.autor}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="País" 
              fullWidth
              required
              value={libro.pais}
              onChange={(e) => handleInputChange('pais', e.target.value)}
              error={!!errors.pais}
              helperText={errors.pais}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Editorial" 
              fullWidth
              required
              value={libro.editorial}
              onChange={(e) => handleInputChange('editorial', e.target.value)}
              error={!!errors.editorial}
              helperText={errors.editorial}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="ISBN" 
              fullWidth
              value={libro.isbn}
              onChange={(e) => handleInputChange('isbn', e.target.value)}
              error={!!errors.isbn}
              helperText={errors.isbn}
              inputProps={{ 
                maxLength: 13,
                pattern: '\\d*'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Descripción" 
              fullWidth
              multiline
              rows={4}
              value={libro.descripcion}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => router.push("/libros")}>
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
            minWidth: "300px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Box sx={{ width: 150, height: 150 }}>
            <Lottie
              animationData={checkAnimation}
              loop={true}
              autoplay={true}
            />
          </Box>
        </Box>
        <DialogTitle
          sx={{
            textAlign: "center",
            pt: 1,
            pb: 3,
          }}
        >
          Libro guardado exitosamente!
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 3,
          }}
        >
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
