import {
    Modal,
    Box,
    IconButton
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import CreditCardForm from './CreditCardForm';
  import { useSelector, useDispatch } from 'react-redux';
  import type { RootState, AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { useTransactionPolling } from '../hooks/useTransactionPolling';
import { resetTransaction } from '../features/transaction/transactionSlice';
import { fetchProducts } from '../features/products/productsData';
  
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
    const dispatch = useDispatch<AppDispatch>();
    const transactionLoading = useSelector((state: RootState) => state.transaction.loading);
    const transactionSuccess = useSelector((state: RootState) => state.transaction.success);

    const { transactionStatus } = useTransactionPolling();
    
    useEffect(() => { 
      if (transactionStatus === "APPROVED" || transactionStatus === "DECLINED") {
        dispatch(fetchProducts());
        setTimeout(() => {
          onClose();
          dispatch(resetTransaction());
        }, 10000);
      }
    }, [transactionStatus, onClose, dispatch]);
    
    return (
      <Modal
        open={open}
        onClose={(transactionLoading || transactionSuccess) ? undefined : (() => {
          onClose();
          dispatch(resetTransaction());
        })}
        disableEscapeKeyDown={transactionLoading}
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {!transactionLoading && !transactionSuccess && (
              <IconButton 
                onClick={() => {
                  onClose();
                  dispatch(resetTransaction());
                }} 
                disabled={transactionLoading}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <CreditCardForm />
        </Box>
      </Modal>
    );
  }
  