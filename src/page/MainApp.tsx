import ProductPage from './ProductPage';
import { Container } from '@mui/material';
import CreditCardModal from '../components/CreditCardModal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { closeModal } from '../features/ui/uiSlice';
import type { AppDispatch } from '../redux/store';

function App() {
  const modalOpen = useSelector((state: RootState) => state.ui.modalOpen);
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <Container maxWidth="lg">
      <ProductPage />
      <CreditCardModal
        open={modalOpen}
        onClose={() => dispatch(closeModal())}
      />
    </Container>
  );
}

export default App;
