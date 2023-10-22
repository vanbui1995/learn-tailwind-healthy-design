/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
      'Noto Sans JP': ['Noto Sans JP', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      light: '#FFF',
      primary500: '#EA6C00',
      secondary300: '#8FE9D0',
      primary300_400: 'linear-gradient(33deg, rgba(255,204,33,1) 0%, rgba(255,150,60,1) 100%)',
      dark600: '#2E2E2E',
      dark500: '#414141',
      gray400: '#777',
      borderColor: '#707070',
      white: '#fff',
      black: '#000',
      purple300: '#755BB4',
      purple400: '#35185A',
      purple450: 'rgb(69 41 114)',
    },
    spacing: {
      sm: 640,
      md: 768,
      lg: 920,
      xl: 1280,
      '2xl': 1536,
    },
    extend: {},
  },
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false,
  },
  // important: true, // <= This is needed to some cases that Tailwind need to override Antd
  plugins: [require('@tailwindcss/line-clamp')],
};
