import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import resolveAliases from 'rollup-plugin-resolve-aliases';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import visualizer from 'rollup-plugin-visualizer';

var production = process.env.NODE_ENV === 'production';

var plugins = [
  resolveAliases({
    aliases: {
      'store': './src/store/index.js'
    },
    jsnext: true
  }),
  babel({
    include: ['./src/**/*.js']
  }),
  copy({
    'src/public': 'dist',
    'node_modules/todomvc-app-css/index.css': 'dist/index.css'
  }),
  json(),
  nodeResolve({ jsnext: true, main: true, browser: true, preferBuiltins: false }),
  commonjs(),
  globals(),
  svelte({
    // By default, all .html and .svelte files are compiled
    // extensions: [ '.my-custom-extension' ],

    // You can restrict which files are compiled
    // using `include` and `exclude`
    // include: 'src/components/**/*.html',

    // By default, the client-side compiler is used. You
    // can also use the server-side rendering compiler
    // generate: 'ssr',

    // Extract CSS into a separate file (recommended).
    // See note below
    css: function (css) {
      // console.log(css.code); // the concatenated CSS
      // console.log(css.map); // a sourcemap

      // creates `main.css` and `main.css.map` — pass `false`
      // as the second argument if you don't want the sourcemap
      css.write('dist/main.css');
    }
  })
];

if (production) {
  plugins.push(uglify({}, minify));
  plugins.push(visualizer({
    filename: './dist/stats.html'
  }));
}

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  sourceMap: true,
  plugins: plugins
}
