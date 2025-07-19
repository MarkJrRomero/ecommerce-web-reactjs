import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a237e',
        color: 'white',
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Información de la empresa */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              E-Commerce App
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
              Tu tienda de confianza para productos de alta calidad. 
              Ofrecemos las mejores marcas con garantía y soporte técnico especializado.
            </Typography>
            
            {/* Redes sociales */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <IconButton
                size="large"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                size="large"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                size="large"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                size="large"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Badges de confianza */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 3,
                  py: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <SecurityIcon sx={{ fontSize: 28, color: '#4caf50' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                    Pagos Seguros
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
                    Transacciones protegidas con encriptación SSL
                  </Typography>
                </Box>
              </Paper>
              
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 3,
                  py: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <ShippingIcon sx={{ fontSize: 28, color: '#2196f3' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                    Envío Gratis
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
                    En todos los pedidos
                  </Typography>
                </Box>
              </Paper>
              
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 3,
                  py: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <SupportIcon sx={{ fontSize: 28, color: '#ff9800' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                    Soporte 24/7
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
                    Asistencia técnica especializada disponible
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 E-Commerce App. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 