import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  cardHolder: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
}

interface FormState {
  data: FormData;
  currentStep: number;
}

const loadFormData = (): FormData => {
  try {
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : {
      name: '',
      address: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      cardHolder: '',
      cardNumber: '',
      expiration: '',
      cvc: '',
    };
  } catch {
    return {
      name: '',
      address: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      cardHolder: '',
      cardNumber: '',
      expiration: '',
      cvc: '',
    };
  }
};

const loadCurrentStep = (): number => {
  try {
    const saved = localStorage.getItem('currentStep');
    return saved ? parseInt(saved, 10) : 0;
  } catch {
    return 0;
  }
};

const initialState: FormState = {
  data: loadFormData(),
  currentStep: loadCurrentStep(),
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.data = { ...state.data, ...action.payload };
      localStorage.setItem('formData', JSON.stringify(state.data));
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      localStorage.setItem('currentStep', action.payload.toString());
    },
    resetForm: (state) => {
      state.data = {
        name: '',
        address: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        cardHolder: '',
        cardNumber: '',
        expiration: '',
        cvc: '',
      };
      state.currentStep = 0;
      localStorage.removeItem('formData');
      localStorage.removeItem('currentStep');
    },
  },
});

export const { updateFormData, setCurrentStep, resetForm } = formSlice.actions;
export default formSlice.reducer; 