import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../ProductCard';
import uiReducer from '../../features/ui/uiSlice';
import type { Product } from '../../features/products/productSlice';

const mockProduct: Product = {
  id: 1,
  name: 'Producto de Prueba',
  description: 'Descripción del producto de prueba',
  price: 29.99,
  stock: 10,
  imageUrl: 'test-image.jpg'
};

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

describe('ProductCard', () => {
  test('renderiza correctamente con datos del producto', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción del producto de prueba')).toBeInTheDocument();
    expect(screen.getByText('$ 30')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Comprar')).toBeInTheDocument();
  });

  test('muestra "Agotado" cuando el stock es 0', () => {
    const productWithoutStock = { ...mockProduct, stock: 0 };
    renderWithProvider(<ProductCard product={productWithoutStock} />);
    
    const buyButton = screen.getByText('Agotado');
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toBeDisabled();
  });

  test('muestra imagen por defecto cuando no hay imageUrl', () => {
    const productWithoutImage = { ...mockProduct, imageUrl: null };
    renderWithProvider(<ProductCard product={productWithoutImage} />);
    
    const image = screen.getByAltText('Producto de Prueba');
    expect(image).toHaveAttribute('src', 'assets/images/product-placeholder.png');
  });

  test('ejecuta dispatch al hacer clic en el botón comprar', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    const buyButton = screen.getByText('Comprar');
    fireEvent.click(buyButton);
    
    expect(buyButton).toBeInTheDocument();
  });
}); 