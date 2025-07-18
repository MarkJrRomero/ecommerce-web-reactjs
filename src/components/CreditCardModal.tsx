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
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
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
  