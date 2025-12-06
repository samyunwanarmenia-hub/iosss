import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.capacitorreact',
  appName: 'Capacitor React App',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  },
};

export default config;
