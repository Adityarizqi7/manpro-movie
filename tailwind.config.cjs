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
        },
    },
    plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
