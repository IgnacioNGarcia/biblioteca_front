import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import { prestamosMock, sociosMock, librosMock } from "../../utils/mockData";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import checkAnimation from "../../assets/animations/check-animation.json";
import { Libro } from "../../utils/mockData";

interface DetallePrestamo {
  id: number;
  libroId: number;
  socioId: number;
  fechaPrestamo: Date | string;
  fechaDevolucionEstimada: Date | string;
  fechaDevolucionReal: Date | string | null;
  estado: string;
}

export default function DetallePrestamo() {
  const router = useRouter();
  const { id, fromSocio } = router.query;
  const [prestamo, setPrestamo] = useState<DetallePrestamo | null>(null);
  const [libro, setLibro] = useState<any>(null);
  const [socio, setSocio] = useState<any>(null);
  const [openDevolucionDialog, setOpenDevolucionDialog] = useState(false);
  const [libroDevuelto, setLibroDevuelto] = useState<Libro | null>(null);

  useEffect(() => {
    if (id) {
      const prestamoEncontrado = prestamosMock.find(p => p.id === Number(id));
      if (prestamoEncontrado) {
        setPrestamo({
          ...prestamoEncontrado,
          fechaPrestamo: prestamoEncontrado.fechaPrestamo instanceof Date 
            ? prestamoEncontrado.fechaPrestamo.toISOString() 
            : prestamoEncontrado.fechaPrestamo,
          fechaDevolucionEstimada: prestamoEncontrado.fechaDevolucionEstimada instanceof Date 
            ? prestamoEncontrado.fechaDevolucionEstimada.toISOString() 
            : prestamoEncontrado.fechaDevolucionEstimada,
          fechaDevolucionReal: prestamoEncontrado.fechaDevolucionReal instanceof Date 
            ? prestamoEncontrado.fechaDevolucionReal.toISOString() 
            : prestamoEncontrado.fechaDevolucionReal
        });
        
        const libroEncontrado = librosMock.find(l => l.id === prestamoEncontrado.libroId);
        setLibro(libroEncontrado);
        
        const socioEncontrado = sociosMock.find(s => s.id === prestamoEncontrado.socioId);
        setSocio(socioEncontrado);
      }
    }
  }, [id]);

  const handleDevolverLibro = () => {
    if (prestamo && libro) {
      setPrestamo({ ...prestamo, estado: 'Devuelto' });
      setLibroDevuelto(libro);
      setOpenDevolucionDialog(true);
    }
  };

  const handleCloseDevolucion = () => {
    setOpenDevolucionDialog(false);
    setLibroDevuelto(null);
  };

  if (!prestamo || !libro || !socio) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Información del Préstamo */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'left', mb: 3 }}>
              <Typography variant="h6">
                Información del Préstamo
              </Typography>
              <Chip 
                label={prestamo?.estado || '-'}
                color={prestamo?.estado === 'Devuelto' ? 'success' : prestamo?.estado === 'Atrasado' ? 'error' : prestamo?.estado === 'Pendiente' ? 'warning' : 'default'}
                sx={{ 
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  color: 'white',
                  ml: 2
                }}>
              </Chip>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">ID del Préstamo</Typography>
                <Typography>{prestamo?.id || '-'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Fecha de Préstamo</Typography>
                <Typography>
                  {prestamo?.fechaPrestamo 
                    ? new Date(prestamo.fechaPrestamo).toLocaleDateString('es-ES')
                    : '-'
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Fecha de Devolución Estimada</Typography>
                <Typography>
                  {prestamo?.fechaDevolucionEstimada 
                    ? new Date(prestamo.fechaDevolucionEstimada).toLocaleDateString('es-ES')
                    : '-'
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Fecha de Devolución Real</Typography>
                <Typography>
                  {prestamo?.fechaDevolucionReal 
                    ? new Date(prestamo.fechaDevolucionReal).toLocaleDateString('es-ES')
                    : '-'
                  }
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Información del Libro */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Información del Libro
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Título
              </Typography>
              <Typography variant="body1">{libro.titulo}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Autor
              </Typography>
              <Typography variant="body1">{libro.autor}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                ISBN
              </Typography>
              <Typography variant="body1">{libro.isbn}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Editorial
              </Typography>
              <Typography variant="body1">{libro.editorial}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Información del Socio */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Información del Socio
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Nombre Completo
              </Typography>
              <Typography variant="body1">{`${socio.nombre} ${socio.apellido}`}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                DNI
              </Typography>
              <Typography variant="body1">{socio.dni}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{socio.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Teléfono
              </Typography>
              <Typography variant="body1">{socio.telefono}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined" 
          onClick={() => {
            if (fromSocio) {
              router.push(`/socios/${fromSocio}`);
            } else {
              router.push('/prestamos');
            }
          }}
        >
          Volver
        </Button>
        {(prestamo.estado === 'Pendiente' || prestamo.estado === 'Atrasado') && (
          <Button 
            variant="contained"
            onClick={handleDevolverLibro}
          >
            Devolver Libro
          </Button>
        )}
      </Box>

      <Dialog
        open={openDevolucionDialog}
        onClose={handleCloseDevolucion}
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
          <Box sx={{ width: 150, height: 150 }}>
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
          ¡Libro devuelto exitosamente!
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            {libroDevuelto?.titulo}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ 
          justifyContent: 'center',
          pb: 3
        }}>
          <Button
            variant="contained"
            onClick={handleCloseDevolucion}
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