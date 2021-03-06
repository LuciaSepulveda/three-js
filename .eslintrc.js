module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'warn',
        'no-unused-vars': 'warn',
        'multiline-ternary': ['off'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-async-promise-executor': ['off'],
        'no-empty-pattern': ['off'],
        'no-undef': ['error'],
        'no-var': ['error'],
        'object-curly-spacing': ['error', 'always'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        semi: ['error', 'never'],
        'spaced-comment': ['off'],
        'no-prototype-builtins': ['off'],
        'sort-keys': ['off'],
        'space-before-function-paren': ['off'],
        indent: ['off'],
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            // your babel options
            presets: ['@babel/preset-react'],
        },
    },
    env: {
        browser: true,
        node: true,
    },
}
