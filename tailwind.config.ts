import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#020617',
      },
      boxShadow: {
        glow: '0 20px 70px rgba(56, 189, 248, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
