import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
    plugins: [angular({ jit: true, tsconfig: 'tsconfig.spec.json' })],
    resolve: {
        dedupe: ['@angular/core', '@angular/material', '@angular/platform-browser'],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/test-setup.ts'],
        passWithNoTests: false,
        coverage: {
            exclude: [
                // Constants-only file with no logic to test
                'src/constants/severity-theme.constants.ts',
                // Enum-only file with no logic to test
                'src/enums/severity-level.enum.ts',
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                statements: 80,
                branches: 75,
                perFile: true,
            },
        },
    },
});
