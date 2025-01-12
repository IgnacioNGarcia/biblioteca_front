import React from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Card,
  CardContent,
} from '@mui/material';
import { useRouter } from 'next/router';
import { prestamosMock, librosMock, sociosMock } from '../../utils/mockData';
import { useState } from 'react';

export default function PrestamosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    titulo: '',
    socioId: '',
    estado: ''
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const devolverLibro = (id: number) => {
    console.log(`Devolviendo libro con ID: ${(id)}`);
  };

  const prestamosFiltrados = React.useMemo(() => {
    return prestamosMock.filter(prestamo => {
      const libro = librosMock.find(l => l.id === prestamo.libroId);
      const socio = sociosMock.find(s => s.id === prestamo.socioId);
      return (
        (!filtros.titulo || libro?.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())) &&
        (!filtros.socioId || socio?.id.toString().includes(filtros.socioId)) &&
        (!filtros.estado || filtros.estado === 'Todos' || prestamo.estado === filtros.estado)
      );
    });
  }, [filtros]);

  const prestamosPaginados = React.useMemo(() => {
    return prestamosFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [prestamosFiltrados, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setPage(0);
  }, [filtros]);

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, color: 'text.primary' }} align="center">
        Gestión de Préstamos
      </Typography>

      <Card sx={{ mb: 4 }}>
      <CardContent>

      <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}>
            <TextField
              label="Buscar por título"
              variant="outlined"
              size="small"
              value={filtros.titulo}
              onChange={(e) => setFiltros({...filtros, titulo: e.target.value})}
              sx={{ minWidth: 200, borderRadius: 6 ,borderWidth: 1}}

            />
            <TextField
              label="ID Socio"
              variant="outlined"
              size="small"
              value={filtros.socioId}
              onChange={(e) => setFiltros({...filtros, socioId: e.target.value})}
              sx={{ minWidth: 200, borderRadius: 6 ,borderWidth: 1}}
            />
            <FormControl size="small">
                <InputLabel id="estado-label">Estado</InputLabel>
                <Select
                  labelId="estado-label"
                  id="estado"
                  label="Estado"
                  value={filtros.estado || ''}
                  onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                  sx={{ 
                    minWidth: 200
                  }}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Devuelto">Devuelto</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="Atrasado">Atrasado</MenuItem>
                  </Select>
                </FormControl>
          </Box>
        </Box>
        <Button 
              variant="contained" 
              onClick={() => router.push('/prestamos/agregar')}
              sx={{ 
                height: 50,
                fontSize: 16,
              }}
            >
              Agregar Préstamo
            </Button>
      </Box>
            
      </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Préstamo</TableCell>
              <TableCell>ID Libro</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>ID Socio</TableCell>
              <TableCell>Nombre Socio</TableCell>
              <TableCell>Fecha Préstamo</TableCell>
              <TableCell>Fecha Devolución Estimada</TableCell>
              <TableCell>Fecha Devolución Real</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestamosPaginados.map((prestamo) => {
              const libro = librosMock.find(l => l.id === prestamo.libroId);
              const socio = sociosMock.find(s => s.id === prestamo.socioId);
              return (
                <TableRow 
                  key={prestamo.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/prestamos/${prestamo.id}`)}
                >
                  <TableCell>{prestamo.id}</TableCell>
                  <TableCell>{prestamo.libroId}</TableCell>
                  <TableCell>{libro?.titulo}</TableCell>
                  <TableCell>{prestamo.socioId}</TableCell>
                  <TableCell>{`${socio?.nombre} ${socio?.apellido}`}</TableCell>
                  <TableCell>
                    {new Date(prestamo.fechaPrestamo).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    {new Date(prestamo.fechaDevolucionEstimada).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    {prestamo.fechaDevolucionReal 
                      ? new Date(prestamo.fechaDevolucionReal).toLocaleDateString('es-ES') 
                      : '-'
                    }
                  </TableCell>
                  <TableCell>{prestamo.estado}</TableCell>
                  <TableCell align="center">
                    {prestamo.estado === 'Pendiente' && (
                      <Button 
                        variant="outlined"
                        size="small"
                        onClick={() => devolverLibro(prestamo.id)}
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
        count={prestamosFiltrados.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Préstamos por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}