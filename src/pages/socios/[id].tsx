import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CuotasMock, CuotasPorSocioMock, sociosMock } from '../../utils/mockData';
import { Socio } from '../../utils/mockData';
import { prestamosMock } from '../../utils/mockData';
import { Prestamo } from '../../utils/mockData';
import { librosMock } from '../../utils/mockData';
import { Libro } from '../../utils/mockData';
import { TablePagination } from '@mui/material';
import { CuotaPorSocio } from '../../utils/mockData';
import {Meses} from '../../utils/mockData';
import React from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Paper,
  Chip,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import dynamic from 'next/dynamic';
// Importación dinámica de Lottie sin SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import checkAnimation from "../../assets/animations/check-animation.json";


export default function DetalleSocio() {
  const router = useRouter();
  const { id } = router.query;
  const [socio, setSocio] = useState<Socio | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mes, setMes] = useState(0);
  const [anio, setAnio] = useState(0);  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDevolucionDialog, setOpenDevolucionDialog] = useState(false);
  const [libroDevuelto, setLibroDevuelto] = useState<Libro | null>(null);

  const devolverLibro = (prestamoId: number) => {
    const prestamo = prestamos.find(p => p.id === prestamoId);
    if (prestamo) {
      const libro = librosMock.find(l => l.id === prestamo.libroId);
      setLibroDevuelto(libro || null);
      setPrestamos(prestamosActuales => 
        prestamosActuales.map(p => 
          p.id === prestamoId 
          ? { ...p, estado: 'Devuelto', fechaDevolucionReal: new Date() } 
          : p
        )
      );
      setOpenDevolucionDialog(true);
    }
  };

  const handleCloseDevolucion = () => {
    setOpenDevolucionDialog(false);
    setLibroDevuelto(null);
  };

  useEffect(() => {
    if (id) {
      const socioEncontrado = sociosMock.find(socio => socio.id === Number(id));
      setSocio(socioEncontrado || null); // Si no encuentra el libro, se establece null
      const prestamosUsuario = prestamosMock.filter(prestamo => prestamo.socioId === Number(id));
      setPrestamos(prestamosUsuario);
    }
  }, [id]); // Añadido id como dependencia para que se ejecute cuando cambie
  
  /*
  useEffect(() => {
    if (id) {
      // Llamada al API para obtener los datos del socio
      fetch(`/api/socios/${id}`)
        .then(response => response.json())
        .then(data => {
          setSocio(data);
        })
        .catch(error => {
          console.error('Error al obtener datos del socio:', error);
        });
    }
  }, [id]);
*/
  const handleSave = async () => {
    try {
      await fetch(`/api/socios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(socio),
      });
      setOpenDialog(true); // Abrimos el diálogo en lugar de setEditMode(false)
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleContinuar = () => {
    setOpenDialog(false);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro que desea eliminar este socio?')) {
      try {
        await fetch(`/api/socios/${id}`, {
          method: 'DELETE',
        });
        router.push('/socios');
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const prestamosPaginados = React.useMemo(() => {
    return prestamos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [prestamos, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (field: keyof Socio, value: string | number) => {
    let hasError = false;
    const newErrors = { ...errors };

    switch (field) {
      case 'nombre':
      case 'apellido':
        if (!/^[A-Za-zÁ-ÿ\s]*$/.test(String(value))) {
          newErrors[field] = 'Solo se permiten letras';
          hasError = true;
        }
        break;
      case 'id':
      case 'dni':
      case 'telefono':
        if (!/^\d*$/.test(String(value))) {
          newErrors[field] = 'Solo se permiten números';
          hasError = true;
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
          newErrors[field] = 'Email inválido';
          hasError = true;
        }
        break;
    }

    if (!hasError) {
      delete newErrors[field];
    }

    setErrors(newErrors);

    if (!hasError && socio) {
      setSocio({
        ...socio,
        [field]: value
      });
    }
  };

  if (!socio) return <div>Cargando...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Detalles del Socio
              </Typography>
              
              {editMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={socio.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    error={!!errors.nombre}
                    helperText={errors.nombre}
                    inputProps={{ 
                      maxLength: 50,
                      pattern: '[A-Za-zÁ-ÿ\\s]*'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Apellido"
                    value={socio.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    error={!!errors.apellido}
                    helperText={errors.apellido}
                    inputProps={{ 
                      maxLength: 50,
                      pattern: '[A-Za-zÁ-ÿ\\s]*'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Número de socio"
                    value={socio.id}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    error={!!errors.id}
                    helperText={errors.id}
                    inputProps={{ 
                      maxLength: 10,
                      pattern: '\\d*'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="DNI"
                    value={socio.dni}
                    onChange={(e) => handleInputChange('dni', e.target.value)}
                    error={!!errors.dni}
                    helperText={errors.dni}
                    inputProps={{ 
                      maxLength: 9,
                      pattern: '\\d*'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={socio.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={socio.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    error={!!errors.telefono}
                    helperText={errors.telefono}
                    inputProps={{ 
                      maxLength: 10,
                      pattern: '\\d*'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Dirección"
                    value={socio.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    error={!!errors.direccion}
                    helperText={errors.direccion}
                    inputProps={{ 
                      maxLength: 100
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography><strong>Nombre:</strong> {socio.nombre}</Typography>
                  <Typography><strong>Apellido:</strong> {socio.apellido}</Typography>
                  <Typography><strong>Número de socio:</strong> {socio.id}</Typography>
                  <Typography><strong>DNI:</strong> {socio.dni}</Typography>
                  <Typography><strong>Email:</strong> {socio.email}</Typography>
                  <Typography><strong>Teléfono:</strong> {socio.telefono}</Typography>
                  <Typography><strong>Dirección:</strong> {socio.direccion}</Typography>
                  <Typography><strong>Fecha de Alta:</strong> {socio.fechaAlta}</Typography>
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                {editMode ? (
                  <>
                    <Button variant="contained" onClick={handleSave}>
                      Guardar
                    </Button>
                    <Button variant="outlined" onClick={() => setEditMode(false)}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="contained" onClick={() => setEditMode(true)}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>
                      Eliminar
                    </Button>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Préstamos
                </Typography>
              <Button 
                variant="contained" 
                onClick={() => router.push(`/prestamos/agregar?socioId=${socio.id}`)}
              >
                Agregar Préstamo
              </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Libro</TableCell>
                      <TableCell>Fecha Préstamo</TableCell>
                      <TableCell>Fecha Devolución Estimada</TableCell>
                      <TableCell>Fecha Devolución Real</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prestamosPaginados.map((p) => {
                      const libro = librosMock.find(l => l.id === p.libroId);
                      return (
                        <TableRow key={p.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/prestamos/${p.id}?fromSocio=${socio?.id}`)}>
                          <TableCell>{libro?.titulo}</TableCell>
                          <TableCell>{new Date(p.fechaPrestamo).toLocaleDateString('es-ES')}</TableCell>
                          <TableCell>{new Date(p.fechaDevolucionEstimada).toLocaleDateString('es-ES')}</TableCell>
                          <TableCell>{p.fechaDevolucionReal ? new Date(p.fechaDevolucionReal).toLocaleDateString('es-ES') : '-'}</TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={p.estado || '-'}
                              color={p.estado === 'Devuelto' ? 'success' : 
                                     p.estado === 'Atrasado' ? 'error' : 
                                     p.estado === 'Pendiente' ? 'warning' : 'default'}
                              size="small"
                              sx={{ 
                                '& .MuiChip-label': {
                                  px: 1,
                                  py: 0.25,
                                  fontSize: '0.75rem'
                                },
                                height: '24px',
                                minWidth: '80px'
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {(p.estado === 'Pendiente'  || p.estado === 'Atrasado') && (
                              <Button 
                                variant="outlined"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  devolverLibro(p.id);
                                }}
                              >
                                Devolver
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={prestamos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Préstamos por página"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderTop: '1px solid rgba(224, 224, 224, 0.2)'
                }}
              />
            </Paper>
          </Grid>
        </Grid>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Cuotas
            </Typography>
            <Button variant="contained" onClick={() => router.push('/cuotas/agregar')}>
              Pagar Nueva Cuota
            </Button>
          </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Mes</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Concepto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha Pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CuotasPorSocioMock.map((c) => {
                const cuota = CuotasMock.find(cuota => cuota.id === c.cuotaId);
                return (
                  <TableRow key={c.id}>
                    <TableCell>{Meses[String(cuota?.mes)]}</TableCell>
                    <TableCell>{cuota?.año}</TableCell>
                    <TableCell>{cuota?.valor}</TableCell>
                    <TableCell>{cuota?.concepto}</TableCell>
                    <TableCell>{c.estado}</TableCell>
                    <TableCell>{c.fechaPago.toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        </Paper>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
          ¡Socio actualizado exitosamente!
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
              loop={false}
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