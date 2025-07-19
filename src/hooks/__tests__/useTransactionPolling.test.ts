describe('useTransactionPolling Hook', () => {
  test('debe existir el archivo del hook', () => {
    const fs = require('fs');
    const path = require('path');
    const hookPath = path.join(__dirname, '../useTransactionPolling.ts');
    expect(fs.existsSync(hookPath)).toBe(true);
  });
}); 