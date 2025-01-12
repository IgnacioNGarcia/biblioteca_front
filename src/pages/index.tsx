import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ImageList, ImageListItem } from '@mui/material';
export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ 
      p: 4,
      bgcolor: 'background.default',
      minHeight: '100vh'
    }}>
      <Typography variant="h5" sx={{ mb: 4, color: 'text.primary', textAlign: 'center', fontWeight: 'bold' }}>
      Somos un grupo de personas que creemos que las grandes obras comienzan con pequeños actos
      </Typography>
      <ImageList>
        <ImageListItem>
          <img src="/images/biblioteca_afuera.png" alt="Biblioteca_afuera"/>
        </ImageListItem>
        <ImageListItem>
          <img src="/images/biblioteca_adentro.jpg" alt="Biblioteca_adentro"/>
        </ImageListItem>
      </ImageList>
    </Box>
  );
} 