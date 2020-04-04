import { createDefaultConfig } from '@open-wc/building-rollup';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcssLit from './src/utils/postcss-lit-plugin';
import visualizer from 'rollup-plugin-visualizer';
import pages from './_site/rollup-files.js';
const { injectManifest } = require('rollup-plugin-workbox');
const path = require('path');

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const configSW = createDefaultConfig({
    input: path.join(process.cwd(), '_site', 'serviceWorker.js'),
    plugins: {
        indexHTML: false,
        workbox: false,
    },
});

const config = createDefaultConfig({
    input: '',
    plugins: {
        indexHTML: false,
        workbox: false,
    },
});

export default [
    {
        ...configSW,
        output: {
            file: path.join(process.cwd(), '_site', 'sw.js'),
            format: 'es',
        },
        plugins: [
            ...configSW.plugins,
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
        ],
    },
    {
        ...config,
        moduleContext: {
            [require.resolve('focus-visible')]: 'window',
        },
        plugins: [
            ...pages,
            ...config.plugins,
            json(),
            postcssLit(),
            commonjs({
                exclude: [
                    '../../node_modules/focus-visible/**',
                    '../../node_modules/prismjs/**',
                ],
            }),
            replace({
                exclude: '*.css',
                values: {
                    'process.env.NODE_ENV': '"production"',
                },
            }),
            injectManifest({
                swSrc: path.join(process.cwd(), '_site', 'sw.js'),
                swDest: path.join(process.cwd(), 'dist', 'sw.js'),
                globDirectory: path.join(process.cwd(), 'dist'),
                globPatterns: ['**/*.{html,js,css,ico}'],
                additionalManifestEntries: ['index.html?homescreen'],
            }),
            visualizer(),
        ],
    },
];
