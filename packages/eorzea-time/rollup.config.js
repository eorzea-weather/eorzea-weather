import path from 'path';
import babel from 'rollup-plugin-babel';

export default {
  dest: path.join(__dirname, 'lib', 'eorzea-time.js'),
  entry: path.join(__dirname, 'src', 'eorzea-time.js'),
  format: 'umd',
  moduleName: 'EorzeaTime',
  plugins: [
    babel()
  ],
  sourceMap: false
};
