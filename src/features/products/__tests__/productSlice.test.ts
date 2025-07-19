import productReducer, { Product } from '../productSlice';
import { fetchProducts } from '../productsData';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción 1',
    price: 100,
    stock: 10,
    imageUrl: 'image1.jpg'
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción 2',
    price: 200,
    stock: 5,
    imageUrl: 'image2.jpg'
  }
];

describe('productSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };

  test('debe retornar el estado inicial', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('debe manejar fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('debe manejar fetchProducts.fulfilled', () => {
    const action = { 
      type: fetchProducts.fulfilled.type, 
      payload: mockProducts 
    };
    const state = productReducer(initialState, action);
    
    expect(state.items).toEqual(mockProducts);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  test('debe manejar fetchProducts.rejected', () => {
    const errorMessage = 'Error al cargar productos';
    const action = { 
      type: fetchProducts.rejected.type, 
      payload: errorMessage 
    };
    const state = productReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('debe mantener el estado de items al manejar pending', () => {
    const stateWithItems = {
      ...initialState,
      items: mockProducts
    };
    const action = { type: fetchProducts.pending.type };
    const state = productReducer(stateWithItems, action);
    
    expect(state.items).toEqual(mockProducts);
    expect(state.loading).toBe(true);
  });
}); 