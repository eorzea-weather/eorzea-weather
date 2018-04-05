import * as path from 'path';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const createConfig = ({ output, plugins = [] }) => ({
  input: path.resolve(__dirname, 'src', 'index.js'),
  output,
  plugins: [
    json({
      preferConst: true,
    }),
    ...plugins,
  ],
  preferConst: output.format === 'es',
});

export default [
  createConfig({
    output: {
      file: path.resolve(__dirname, pkg.main),
      format: 'umd',
      name: 'EorzeaWeather',
    },
    plugins: [
      babel(),
      uglify(),
    ],
  }),
  createConfig({
    output: {
      file: path.resolve(__dirname, pkg.module),
      format: 'es',
    },
  }),
];
