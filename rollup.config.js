import pkg from './package.json';

export default {
    input: 'lib.js',  
    output: [
        {
            name: 'keywall',
            file: pkg.browser,
            format: 'umd',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
};
