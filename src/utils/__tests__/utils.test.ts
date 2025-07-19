import { formatPrice, enforceNumber, enforceText, enforceDateExpiration, getCardType } from '../utils';

describe('formatPrice', () => {
  test('formatea precio correctamente', () => {
    expect(formatPrice(1000)).toBe('$ 1.000');
    expect(formatPrice(25000)).toBe('$ 25.000');
    expect(formatPrice(1000000)).toBe('$ 1.000.000');
  });

  test('maneja precio cero', () => {
    expect(formatPrice(0)).toBe('$ 0');
  });

  test('maneja números decimales', () => {
    expect(formatPrice(1000.5)).toBe('$ 1.001');
  });
});

describe('enforceNumber', () => {
  test('elimina caracteres no numéricos', () => {
    expect(enforceNumber('abc123def')).toBe('123');
    expect(enforceNumber('12-34-56')).toBe('123456');
    expect(enforceNumber('abc')).toBe('');
  });

  test('mantiene solo números', () => {
    expect(enforceNumber('1234567890')).toBe('1234567890');
  });
});

describe('enforceText', () => {
  test('elimina caracteres no alfabéticos', () => {
    expect(enforceText('abc123def')).toBe('abcdef');
    expect(enforceText('Juan Pérez 123')).toBe('Juan Prez ');
    expect(enforceText('123456')).toBe('');
  });

  test('mantiene letras y espacios', () => {
    expect(enforceText('Juan Carlos Pérez')).toBe('Juan Carlos Prez');
  });
});

describe('enforceDateExpiration', () => {
  test('elimina caracteres no válidos para fecha', () => {
    expect(enforceDateExpiration('12/34')).toBe('12/34');
    expect(enforceDateExpiration('12-34')).toBe('1234');
    expect(enforceDateExpiration('abc12/34def')).toBe('12/34');
  });

  test('mantiene números y barras', () => {
    expect(enforceDateExpiration('12/25')).toBe('12/25');
  });
});

describe('getCardType', () => {
  test('identifica tarjeta Visa', () => {
    expect(getCardType('4111111111111111')).toBe('visa');
    expect(getCardType('4000000000000000')).toBe('visa');
  });

  test('identifica tarjeta Mastercard', () => {
    expect(getCardType('5111111111111111')).toBe('mastercard');
    expect(getCardType('5555555555554444')).toBe('mastercard');
  });

  test('retorna default para otros números', () => {
    expect(getCardType('3111111111111111')).toBe('default');
    expect(getCardType('6111111111111111')).toBe('default');
  });
}); 