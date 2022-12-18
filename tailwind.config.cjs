let plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'error-color': '#B8351C',
                'indigo-low': '#f1f1ff',
                'dark-theme': '#1E1E2C',
            },
            screens: {
                '6xs': { max: '240px' },
                '5xs': { max: '320px' },
                '4xs': { max: '375px' },
                '3xs': { max: '411px' },
                '2xs': { max: '480px' },
                xs: { max: '540px' },
            },
        },
    },
    plugins: [
        require('prettier-plugin-tailwindcss'),
        plugin(function ({ addVariant }) {
            addVariant('select-all-child', '&:>*')
        }),
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
}
