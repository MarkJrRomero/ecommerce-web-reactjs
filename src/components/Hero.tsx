import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  KeyboardArrowDown as ScrollIcon,
} from '@mui/icons-material';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';

export default function Hero() {

  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: isMobile ? '100px' : '0px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          {/* Contenido principal */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Chip
                label="¡Nuevos Productos!"
                color="success"
                icon={<TrendingIcon />}
                sx={{ mb: 2, fontWeight: 600 }}
              />
              
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Productos de alta calidad
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  maxWidth: 500,
                }}
              >
               Descubre nuestra amplia selección de productos.
              </Typography>
              
              
            </Box>
          </Grid>

          {/* Características destacadas */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ mb: 5, mt: 5}}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    <ShippingIcon sx={{ fontSize: 50, color: '#4caf50', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                      Envío Gratis
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      En todos los pedidos
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    <SecurityIcon sx={{ fontSize: 50, color: '#2196f3', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                      Pagos seguros
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Pagos con tarjeta de crédito o débito
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    <SupportIcon sx={{ fontSize: 50, color: '#ff9800', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                      Soporte 24/7
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Asistencia técnica especializada
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    <TrendingIcon sx={{ fontSize: 50, color: '#e91e63', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                      Últimas Tendencias
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Productos de vanguardia
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Icono de scroll hacia abajo - Desktop */}
      {!isMobile && (
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 50,
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateX(-50%) translateY(0)',
            },
            '40%': {
              transform: 'translateX(-50%) translateY(-10px)',
            },
            '60%': {
              transform: 'translateX(-50%) translateY(-5px)',
            },
          },
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 50,
            border: '2px solid rgba(255, 255, 255, 0.6)',
            borderRadius: 15,
            position: 'relative',
            mb: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              animation: 'scroll 2s infinite',
            },
            '@keyframes scroll': {
              '0%': {
                opacity: 1,
                transform: 'translateX(-50%) translateY(0)',
              },
              '100%': {
                opacity: 0,
                transform: 'translateX(-50%) translateY(20px)',
              },
            },
          }}
        />
        <ScrollIcon 
          sx={{ 
            fontSize: 24, 
            color: 'rgba(255, 255, 255, 0.8)',
            animation: 'fadeInOut 2s infinite',
            '@keyframes fadeInOut': {
              '0%, 100%': {
                opacity: 0.6,
              },
              '50%': {
                opacity: 1,
              },
            },
          }} 
        />
      </Box>
      )}

      {/* Icono de mano flotante - Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: 'absolute',
            top: '26%',
            right: 25,
            zIndex: 2,
            cursor: 'pointer',
            animation: 'handSwipe 2.5s infinite ease-in-out',
            '@keyframes handSwipe': {
              '0%': {
                transform: 'translateY(0) rotate(-30deg)',
                opacity: 0.7,
              },
              '25%': {
                transform: 'translateY(-8px) rotate(-35deg)',
                opacity: 0.9,
              },
              '50%': {
                transform: 'translateY(-15px) rotate(-40deg)',
                opacity: 1,
              },
              '75%': {
                transform: 'translateY(-8px) rotate(-35deg)',
                opacity: 0.9,
              },
              '100%': {
                transform: 'translateY(0) rotate(-30deg)',
                opacity: 0.7,
              },
            },
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
              backdropFilter: 'blur(15px)',
              borderRadius: '50%',
              p: 2,
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <SwipeUpIcon
              sx={{
                fontSize: 30,
                color: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
} 