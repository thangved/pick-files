import { defineConfig, Options } from 'tsup';
import { name, version } from './package.json';

const baseConfig: Options = {
  entry: ['src/**/*.ts'],
  minify: true,
  sourcemap: false,
  splitting: false,
  clean: true,
  dts: true,
  define: {
    PACKAGE_NAME: `"${name}"`,
    PACKAGE_VERSION: `"${version}"`,
  },
  minifySyntax: true,
  platform: 'browser',
};

export default defineConfig([
  {
    ...baseConfig,
    format: 'cjs',
    target: 'node14',
    outDir: 'dist/cjs',
  },
  {
    ...baseConfig,
    format: 'esm',
    target: 'esnext',
    outDir: 'dist/esm',
    outExtension: () => ({
      js: '.js',
      dts: '.d.ts',
    }),
  },
]);
