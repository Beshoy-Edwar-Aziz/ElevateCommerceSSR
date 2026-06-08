// Learn more about Vitest configuration options at https://vitest.dev/config/

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks:true,
    restoreMocks:true,
    mockReset:true
  },

});
