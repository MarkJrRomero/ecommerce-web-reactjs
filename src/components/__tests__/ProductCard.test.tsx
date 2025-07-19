import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../ProductCard';
import uiReducer from '../../features/ui/uiSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  });
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

const mockProduct = {
  id: 1,
  name: 'Producto de Prueba',
  description: 'Descripción del producto de prueba',
  price: 29.99,
  stock: 10,
  imageUrl: 'test-image.jpg'
};

describe('ProductCard', () => {
  test('debe renderizar sin errores', () => {
    const { container } = renderWithProvider(<ProductCard product={mockProduct} />);
    expect(container).toBeTruthy();
  });

  test('debe contener el nombre del producto', () => {
    const { getByText } = renderWithProvider(<ProductCard product={mockProduct} />);
    expect(getByText('Producto de Prueba')).toBeTruthy();
  });

  test('debe contener la descripción del producto', () => {
    const { getByText } = renderWithProvider(<ProductCard product={mockProduct} />);
    expect(getByText('Descripción del producto de prueba')).toBeTruthy();
  });
}); 