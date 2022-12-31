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
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'backdrop-blur': value => {
                        const cssBackdropFilterValue = [
                            'var(--tw-backdrop-blur,)',
                            'var(--tw-backdrop-brightness,)',
                            'var(--tw-backdrop-contrast,)',
                            'var(--tw-backdrop-grayscale,)',
                            'var(--tw-backdrop-hue-rotate,)',
                            'var(--tw-backdrop-invert,)',
                            'var(--tw-backdrop-opacity,)',
                            'var(--tw-backdrop-saturate,)',
                            'var(--tw-backdrop-sepia,)',
                        ].join(' ')

                        return {
                            '--tw-backdrop-blur': `blur(${value})`,
                            '@defaults backdrop-filter': {},
                            'backdrop-filter': cssBackdropFilterValue,
                        }
                    },
                },
                { values: theme('backdropBlur') }
            )
        }),
    ],
}
