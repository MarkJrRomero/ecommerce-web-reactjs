import { createSlice } from '@reduxjs/toolkit';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
};

const initialState: Product[] = [
  {
    id: '1',
    name: 'Taza Edición Especial',
    price: 39000,
    description: 'Taza conmemorativa edición limitada',
    stock: 10,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    name: 'Camiseta Blanca',
    price: 59000,
    description: 'Camiseta 100% algodón',
    stock: 5,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '3',
    name: 'Camiseta Negra',
    price: 59000,
    description: 'Camiseta 100% algodón',
    stock: 5,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '4',
    name: 'Camiseta Negra',
    price: 59000,
    description: 'Camiseta 100% algodón',
    stock: 5,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '5',
    name: 'Camiseta Negra',
    price: 59000,
    description: 'Camiseta 100% algodón',
    stock: 5,
    image: 'https://picsum.photos/200/300',
  },
];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
