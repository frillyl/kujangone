/** @type {import('tailwindcss').Config} */

export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-light': 'var(--color-primary-light)',
                'primary-dark': 'var(--color-primary-dark)',
                'secondary-light': 'var(--color-secondary-light)',
                'secondary-dark': 'var(--color-secondary-dark)',
                'background-light': 'var(--color-background-light)',
                'background-dark': 'var(--color-background-dark)',
                'text-light': 'var(--color-text-light)',
                'text-dark': 'var(--color-text-dark)',
                'line-light': 'var(--color-line-light)',
                'line-dark': 'var(--color-line-dark)',
            },
            fontFamily: {
                heading: ['Montserrat', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            screens: {
                '2xl': '1440px',
                'xl': '1280px',
                'lg': '1024px',
                'md': '768px',
                'sm': '640px',
                'xs': '375px',
            },
        },
    },
    plugins: [],
};