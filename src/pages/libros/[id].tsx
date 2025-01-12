import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { librosMock } from '../../utils/mockData';
import { 
  Box, 
  Button, 
  TextField, 
  Paper,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Grid
} from '@mui/material';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  año: number;
  editorial: string;
  disponible: boolean;
  descripcion: string;
  isbn: number;
}

// Interfaces para la respuesta de Google Books
interface GoogleBookImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: GoogleBookImageLinks;
}

interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

interface GoogleBooksResponse {
  items: GoogleBookItem[];
  totalItems: number;
}

export default function DetalleLibro() {
  const router = useRouter();
  const { id } = router.query;
  const [libro, setLibro] = useState<Libro | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isbn, setIsbn] = useState('');
  const titulo_para_busqueda = libro?.titulo.replace(/\s+/g, '+');
  const [bookData, setBookData] = useState<GoogleBookItem | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const libroEncontrado = librosMock.find(libro => libro.id === Number(id));
      setLibro(libroEncontrado || null); // Si no encuentra el libro, se establece null
    }
  }, [id]); // Añadido id como dependencia para que se ejecute cuando cambie
  
    /*if (id) {
      // Aquí harías tu llamada al API
      const fetchLibro = async () => {
        try {
          const response = await fetch(`/api/libros/${id}`);
          const data = await response.json();
          setLibro(data);
        } catch (error) {
          console.error('Error al cargar el libro:', error);
        }
      };
      fetchLibro();
    }
  }, [id]);*/

  const handleSave = async () => {
    try {
      await fetch(`/api/libros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libro),
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  useEffect(() => {
    const fetchBookCover = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${titulo_para_busqueda}`
        );
        const data: GoogleBooksResponse = await response.json();
        if (data.items && data.items.length > 0) {
          setBookData(data.items[0]);
        }
      } catch (error) {
        console.error('Error fetching book cover:', error);
      }
    };

    if (libro?.titulo) {
      fetchBookCover();
    }
  }, [libro?.titulo]);

  if (!libro) return <div>Cargando...</div>;

  return (
    
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 2 
      }}>
        <Button 
          variant="contained" 
          onClick={() => router.push('/libros')}
          sx={{ 
            height: 40,
            fontSize: 16
          }}
        >
          Volver al catálogo de libros
        </Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Grid container alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs>
            <Typography variant="h4">
              Detalles del Libro
            </Typography>
          </Grid>
        </Grid>
          
        <Grid 
          container 
          alignItems="flex-start" 
          sx={{ 
            mb: 3,
            minHeight: '400px'
          }}
        >
          <Grid item xs={6}>
          {editMode ? (
          <>
          <TextField
              fullWidth
              label="ID Libro"
              value={libro.id}
              onChange={(e) => setLibro({...libro, id: Number(e.target.value)})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Título"
              value={libro.titulo}
              onChange={(e) => setLibro({...libro, titulo: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Autor"
              value={libro.autor}
              onChange={(e) => setLibro({...libro, autor: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="ISBN"
              value={libro.isbn}
              onChange={(e) => setLibro({...libro, isbn: Number(e.target.value)})}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Disponibilidad</InputLabel>
              <Select
                value={libro.disponible ? 'true': 'false'}
                onChange={(e) => setLibro({...libro, disponible: e.target.value === 'true'})}
                label="Disponibilidad"
              >
                <MenuItem value="true">Disponible</MenuItem>
                <MenuItem value="false">No Disponible</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <Typography><strong>ID Libro:</strong> {libro.id}</Typography>
            <Typography><strong>Título:</strong> {libro.titulo}</Typography>
            <Typography><strong>Autor:</strong> {libro.autor}</Typography>
            <Typography><strong>Año:</strong> {libro.año}</Typography>
            <Typography><strong>Editorial:</strong> {libro.editorial}</Typography>
            <Typography><strong>ISBN:</strong> {libro.isbn}</Typography>
            <Typography><strong>Estado:</strong> {libro.disponible ? 'Disponible' : 'Prestado'}</Typography>
          </>
        )}
        <Box sx={{ mt: 3 }}>
          {editMode ? (
            <>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                Guardar
              </Button>
              <Button onClick={() => setEditMode(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={() => setEditMode(true)} sx={{ mr: 1 }}>
                Editar
              </Button>
              <Button variant="outlined" color="error">
                Eliminar
              </Button>
            </>
          )}
        </Box>
          </Grid>
          <Grid item xs={6}>
            {!editMode && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    height: '300px',
                    width: 'auto',
                    transform: 'scale(1.4)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={bookData?.volumeInfo?.imageLinks?.thumbnail || '/placeholder-book.png'} 
                    alt={libro.titulo}
                    style={{
                      height: '100%',
                      width: 'auto',
                      objectFit: 'contain',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 4s ease-in',
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.includes('placeholder-book.png')) {
                        img.src = '/placeholder-book.png';
                      }
                      setImageLoaded(true);
                    }}
                  />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
        
      </Paper>
    </Box>
  );
}