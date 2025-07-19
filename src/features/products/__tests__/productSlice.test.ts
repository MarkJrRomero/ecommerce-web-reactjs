describe('productSlice', () => {
  test('debe existir el archivo del slice', () => {
    const fs = require('fs');
    const path = require('path');
    const slicePath = path.join(__dirname, '../productSlice.ts');
    expect(fs.existsSync(slicePath)).toBe(true);
  });
}); 