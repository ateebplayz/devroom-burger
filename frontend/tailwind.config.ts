import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-thin': ['Roboto-Thin', 'sans-serif'],
        'roboto-thinitalic': ['Roboto-ThinItalic', 'sans-serif'],
        'roboto-light': ['Roboto-Light', 'sans-serif'],
        'roboto-lightitalic': ['Roboto-LightItalic', 'sans-serif'],
        'roboto-regular': ['Roboto-Regular', 'sans-serif'],
        'roboto-italic': ['Roboto-Italic', 'sans-serif'],
        'roboto-medium': ['Roboto-Medium', 'sans-serif'],
        'roboto-mediumitalic': ['Roboto-MediumItalic', 'sans-serif'],
        'roboto-bold': ['Roboto-Bold', 'sans-serif'],
        'roboto-bolditalic': ['Roboto-BoldItalic', 'sans-serif'],
        'roboto-black': ['Roboto-Black', 'sans-serif'],
        'roboto-blackitalic': ['Roboto-BlackItalic', 'sans-serif'],
      },
      colors: {
        primary: '#d5002e',
        secondary: '#f9e076',
        primaryLight: 'rgba(213, 0, 46, 0.5)',
        secondaryLight: 'rgba(244, 255, 0, 0.5)',
      }
    },
  },
  plugins: [require('daisyui')],
};
export default config;
