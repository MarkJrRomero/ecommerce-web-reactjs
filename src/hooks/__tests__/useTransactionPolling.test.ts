import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useTransactionPolling } from '../useTransactionPolling';
import transactionReducer from '../../features/transaction/transactionSlice';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      transaction: transactionReducer,
    },
    preloadedState: {
      transaction: initialState,
    },
  });
};

const renderHookWithProvider = (initialState = {}) => {
  const store = createTestStore(initialState);
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );
  return renderHook(() => useTransactionPolling(), { wrapper });
};

describe('useTransactionPolling', () => {
  test('debe retornar isPolling false cuando no hay transacción', () => {
    const { result } = renderHookWithProvider();
    
    expect(result.current.isPolling).toBe(false);
    expect(result.current.transactionStatus).toBeUndefined();
  });

  test('debe retornar isPolling true cuando hay transacción pendiente', () => {
    const initialState = {
      transactionResult: {
        id: '123',
        status: 'PENDING',
      },
    };
    
    const { result } = renderHookWithProvider(initialState);
    
    expect(result.current.isPolling).toBe(true);
    expect(result.current.transactionStatus).toBe('PENDING');
  });

  test('debe retornar isPolling false cuando la transacción está aprobada', () => {
    const initialState = {
      transactionResult: {
        id: '123',
        status: 'APPROVED',
      },
    };
    
    const { result } = renderHookWithProvider(initialState);
    
    expect(result.current.isPolling).toBe(false);
    expect(result.current.transactionStatus).toBe('APPROVED');
  });

  test('debe retornar isPolling false cuando la transacción está declinada', () => {
    const initialState = {
      transactionResult: {
        id: '123',
        status: 'DECLINED',
      },
    };
    
    const { result } = renderHookWithProvider(initialState);
    
    expect(result.current.isPolling).toBe(false);
    expect(result.current.transactionStatus).toBe('DECLINED');
  });
}); 