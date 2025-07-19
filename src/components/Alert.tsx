import { Alert as MuiAlert, AlertTitle, Box, IconButton } from '@mui/material';
import { Close as CloseIcon, Error as ErrorIcon, CheckCircle as SuccessIcon, Warning as WarningIcon, Info as InfoIcon } from '@mui/icons-material';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  showIcon?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
}

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case 'error':
      return <ErrorIcon />;
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
      return <InfoIcon />;
    default:
      return null;
  }
};

const getAlertColor = (type: AlertType) => {
  switch (type) {
    case 'error':
      return '#d32f2f';
    case 'success':
      return '#2e7d32';
    case 'warning':
      return '#ed6c02';
    case 'info':
      return '#0288d1';
    default:
      return '#1976d2';
  }
};

export default function Alert({ 
  type, 
  title, 
  message, 
  onClose, 
  showIcon = true,
  variant = 'filled'
}: AlertProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        m: 2,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: variant === 'filled' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        border: variant === 'outlined' ? `2px solid ${getAlertColor(type)}` : 'none',
        background: variant === 'filled' 
          ? `linear-gradient(135deg, ${getAlertColor(type)}15 0%, ${getAlertColor(type)}25 100%)`
          : 'transparent',
      }}
    >
      <MuiAlert
        severity={type}
        variant={variant}
        icon={showIcon ? getAlertIcon(type) : false}
        sx={{
          borderRadius: 2,
          border: 'none',
          background: variant === 'filled' ? 'transparent' : undefined,
          '& .MuiAlert-message': {
            color: variant === 'filled' ? getAlertColor(type) : undefined,
            fontWeight: 500,
          },
          '& .MuiAlert-icon': {
            color: getAlertColor(type),
          },
          '& .MuiAlertTitle-root': {
            color: getAlertColor(type),
            fontWeight: 600,
            fontSize: '1.1rem',
          },
        }}
        action={
          onClose && (
            <IconButton
              aria-label="cerrar"
              color="inherit"
              size="small"
              onClick={onClose}
              sx={{
                color: getAlertColor(type),
                '&:hover': {
                  backgroundColor: `${getAlertColor(type)}15`,
                },
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </MuiAlert>
    </Box>
  );
} 