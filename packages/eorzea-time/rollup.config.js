import * as path from 'path';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const createConfig = ({ output, plugins = [] }) => ({
  input: path.resolve(__dirname, 'src', 'eorzea-time.js'),
  output,
  plugins: [
    babel({
      presets: [
        [
          '@babel/env',
          {
            loose: output.format !== 'es',
            modules: false,
            targets: Object.assign({
              node: '8',
            }, output.format === 'umd' ? {
              browsers: [
                '> 1%',
                'Last 2 versions',
              ],
            } : {}),
          },
        ],
      ],
    }),
    ...plugins,
  ],
});

export default [
  createConfig({
    output: {
      file: path.resolve(__dirname, pkg.main),
      format: 'umd',
      name: 'EorzeaTime',
    },
    plugins: [
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
