import * as path from 'path';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  input: path.resolve(__dirname, 'src', 'index.js'),
  output: [
    {
      file: path.resolve(__dirname, 'lib', 'index.js'),
      format: 'umd',
      name: 'EorzeaWeather',
    },
    {
      file: path.resolve(__dirname, 'lib', 'index.es.js'),
      format: 'es',
    },
  ],
  plugins: [
    json(),
    babel(),
  ],
};
