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
  Card,
  CardContent,
  TablePagination,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useRouter } from 'next/router';
import { librosMock } from '../../utils/mockData';
import { useState } from 'react';

export default function LibrosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    titulo: '',
    autor: '',
    año: '',
    estado: '',
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const librosFiltrados = React.useMemo(() => {
    return librosMock.filter(libro => {
      return (
        libro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()) &&
        libro.autor.toLowerCase().includes(filtros.autor.toLowerCase()) &&
        (filtros.año === '' || libro.año.toString().includes(filtros.año)) &&
        (filtros.estado === '' ||filtros.estado === 'Todos' || libro.disponible === (filtros.estado === 'Disponible'))
      );
    });
  }, [filtros]);

  const librosPaginados = React.useMemo(() => {
    return librosFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [librosFiltrados, page, rowsPerPage]);

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
      <Typography variant="h3" sx={{ mb: 4, color: 'text.primary'}} align="center">
        Catálogo de Libros
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
            }}>
              <TextField
                label="Título"
                variant="outlined"
                size="small"
                value={filtros.titulo}
                onChange={(e) => setFiltros({...filtros, titulo: e.target.value})}
                sx={{ minWidth: 200, borderRadius: 6 ,borderWidth: 1, borderColor: 'primary.main'}}
              />
              <TextField 
                label="Autor"
                variant="outlined"
                size="small"
                value={filtros.autor}
                onChange={(e) => setFiltros({...filtros, autor: e.target.value})}
                sx={{ minWidth: 200 }}
              />
              <TextField 
                label="Año"
                variant="outlined"
                size="small"
                value={filtros.año}
                onChange={(e) => setFiltros({...filtros, año: e.target.value})}
                sx={{ minWidth: 200 }}
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
                    minWidth: 200,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: 'primary.main',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 1,
                        borderRadius: 8,
                      },
                    }
                  }}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Disponible">Disponible</MenuItem>
                  <MenuItem value="Prestado">Prestado</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button 
              variant="contained" 
              onClick={() => router.push('/libros/agregar')}
              sx={{ 
                height: 50,
                fontSize: 16,
              }}
            >
              Agregar Libro
            </Button>
          </Box>
        </CardContent>
        
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow>
              <TableCell>ID Libro</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Editorial</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {librosPaginados.map((libro) => (
              <TableRow 
                key={libro.id}
                onClick={() => router.push(`/libros/${libro.id}`)}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{libro.id}</TableCell>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor}</TableCell>
                <TableCell>{libro.año}</TableCell>
                <TableCell>{libro.editorial}</TableCell>
                <TableCell>{libro.disponible ? 'Disponible' : 'Prestado'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={librosFiltrados.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Libros por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}