import {
    Modal,
    Box,
    IconButton
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import CreditCardForm from './CreditCardForm';
  
  type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '80%', sm: '90%', md: 500, lg: 600 },
    maxWidth: 600,
    maxHeight: { xs: '90vh', sm: '90vh', md: '90vh' },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2, sm: 2, md: 3 },
    overflowY: 'auto',
  };
  
  export default function CreditCardModal({ open, onClose }: Props) {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
          </Box>
          <CreditCardForm onClose={onClose} />
        </Box>
      </Modal>
    );
  }
  