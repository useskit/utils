// import { babel } from '@rollup/plugin-babel'
import banner from 'rollup-plugin-banner'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const bannerInfo = `UsesKit Js v${pkg.version}  Author: <%= pkg.author %>\nWebsite: <%= pkg.homepage %>\nEmail:   useskit@gmail.com\nReleased under the MIT license`
const input = './src/index.ts'
const plugins = [typescript(), nodeResolve(), /* babel(), */ banner(bannerInfo)]
const pluginsMin = [typescript(), nodeResolve(), /* babel(), */ terser(), banner(bannerInfo)]
export default [
  {
    input,
    output: [{
      format: 'esm',
      strict: true,
      name: 'KitRouter',
      file: './dist/index.esm.js',
    }, {
      format: 'umd',
      name: 'KitRouter',
      strict: true,
      file: './dist/index.umd.js',
    }],
    plugins,
  }, {
    input,
    output: [{
      format: 'esm',
      strict: true,
      name: 'KitRouter',
      file: './dist/index.esm.min.js',
    }, {
      format: 'umd',
      name: 'KitRouter',
      strict: true,
      file: './dist/index.umd.min.js',
    }],
    plugins: pluginsMin,
  },
]
