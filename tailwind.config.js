import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'bleu-nuit':  '#071A33',
                'bleu-ng':    '#08457E',
                'bleu':       '#14609E',
                'azur':       '#2E8FD6',
                'azur-pale':  '#E8F1FA',
                'or':         '#C8A24A',
                'or-clair':   '#E3C878',
                'vert':       '#1F7A5C',
                'gris':       '#5B6B7E',
                'gris-clair': '#D6E0EA',
                'ligne':      '#E2E9F1',
                'blanc':      '#FBFCFE',
            },
            fontFamily: {
                sans:  ['Instrument Sans', ...defaultTheme.fontFamily.sans],
                serif: ['Fraunces', ...defaultTheme.fontFamily.serif],
                label: ['Archivo', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                'sm':    '12px',
                DEFAULT: '18px',
                'full':  '999px',
            },
            boxShadow: {
                'soft': '0 2px 12px rgba(7,26,51,.08)',
                'md':   '0 4px 24px rgba(7,26,51,.12)',
            },
        },
    },

    plugins: [forms],
};
