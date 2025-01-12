import { useState } from 'react';
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
  Button
} from '@mui/material';
import { useRouter } from 'next/router';
import { sociosMock } from '../../utils/mockData';

interface Filtros {
  id: string;
  nombre: string;
  dni: string;
}

export default function SociosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState<Filtros>({
    id: '',
    nombre: '',
    dni: '',
  });

  const sociosFiltrados = sociosMock.filter(socio => {
    const nombreCompleto = `${socio.nombre} ${socio.apellido}`.toLowerCase();
    return (
      nombreCompleto.includes(filtros.nombre.toLowerCase()) &&
      socio.dni.includes(filtros.dni)
    );
  });

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, color: 'text.primary' }} align="center">
        Gestión de Socios
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
              label="Número de socio" 
              variant="outlined" 
              size="small"
              value={filtros.id}
              onChange={(e) => setFiltros({...filtros, id: e.target.value})}
              sx={{ minWidth: 200 }}
            />
            <TextField 
              label="Nombre" 
              variant="outlined" 
              size="small"
              value={filtros.nombre}
              onChange={(e) => setFiltros({...filtros, nombre: e.target.value})}
              sx={{ minWidth: 200 }}
            />
            <TextField 
              label="DNI" 
              variant="outlined" 
              size="small"
              value={filtros.dni}
              onChange={(e) => setFiltros({...filtros, dni: e.target.value})}
              sx={{ minWidth: 150 }}
            />
          </Box>

          <Button 
            variant="contained" 
            onClick={() => router.push('/socios/agregar')}
            sx={{ 
              height: 50,
              fontSize: 16,
            }}
          >
            Agregar Socio
          </Button>
        </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Número Socio</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sociosFiltrados.map((socio) => (
              <TableRow 
                key={socio.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/socios/${socio.id}`)}
              >
                <TableCell>{socio.id}</TableCell>
                <TableCell>{socio.dni}</TableCell>
                <TableCell>{socio.nombre}</TableCell>
                <TableCell>{socio.apellido}</TableCell>
                <TableCell>{socio.email}</TableCell>
                <TableCell>{socio.telefono}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}