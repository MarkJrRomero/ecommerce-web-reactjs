import uiReducer, { openModal, closeModal } from '../uiSlice';
import type { Product } from '../../products/productSlice';

const mockProduct: Product = {
  id: 1,
  name: 'Producto de Prueba',
  description: 'Descripción del producto',
  price: 100,
  stock: 10,
  imageUrl: 'test-image.jpg'
};

describe('uiSlice', () => {
  const initialState = {
    selectedProduct: null,
    modalOpen: false,
  };

  test('debe retornar el estado inicial', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('debe manejar openModal', () => {
    const state = uiReducer(initialState, openModal(mockProduct));
    
    expect(state.selectedProduct).toEqual(mockProduct);
    expect(state.modalOpen).toBe(true);
  });

  test('debe manejar closeModal', () => {
    const stateWithModal = {
      selectedProduct: mockProduct,
      modalOpen: true,
    };
    const state = uiReducer(stateWithModal, closeModal());
    
    expect(state.selectedProduct).toBe(null);
    expect(state.modalOpen).toBe(false);
  });

  test('debe mantener el estado correcto después de abrir y cerrar modal', () => {
    let state = uiReducer(initialState, openModal(mockProduct));
    expect(state.selectedProduct).toEqual(mockProduct);
    expect(state.modalOpen).toBe(true);
    
    state = uiReducer(state, closeModal());
    expect(state.selectedProduct).toBe(null);
    expect(state.modalOpen).toBe(false);
  });
}); 