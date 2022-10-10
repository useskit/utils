import banner from 'rollup-plugin-banner'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const _banner = `UsesKit Js v${pkg.version}  Author: <%= pkg.author %>\nWebsite: <%= pkg.homepage %>\nEmail:   useskit@gmail.com\nReleased under the MIT license`

const plugins = [typescript(), nodeResolve(), banner(_banner)]
const pluginsMin = [typescript(), nodeResolve(), terser(), banner(_banner)]
export default [{
  input: './src/index.ts',
  output: [{
    format: 'umd',
    strict: true,
    name: 'utils',
    file: './dist/index.umd.js',
  }, {
    format: 'esm',
    strict: true,
    name: 'utils',
    file: './dist/index.esm.js',
  }],
  plugins,
}, {
  input: './src/index.ts',
  output: [{
    format: 'umd',
    strict: true,
    name: 'utils',
    file: './dist/index.umd.min.js',
  }],
  plugins: pluginsMin,
}]
