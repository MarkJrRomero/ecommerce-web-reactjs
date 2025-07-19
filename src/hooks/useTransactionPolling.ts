import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { checkTransactionStatus } from '../features/transaction/transactionData';

export const useTransactionPolling = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactionResult } = useSelector((state: RootState) => state.transaction);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (transactionResult?.id && transactionResult.status === "PENDING") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        dispatch(checkTransactionStatus(transactionResult.id));
      }, 5000);

      dispatch(checkTransactionStatus(transactionResult.id));
    }

    // Limpiamos el intervalo cuando el componente se desmonta o cuando la transacción se completa
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dispatch, transactionResult?.id, transactionResult?.status]);

  // Detenemos el polling cuando la transacción se completa (APPROVED o DECLINED)
  useEffect(() => {
    if (transactionResult?.status === "APPROVED" || transactionResult?.status === "DECLINED") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [transactionResult?.status]);

  return {
    isPolling: intervalRef.current !== null,
    transactionStatus: transactionResult?.status,
  };
}; 