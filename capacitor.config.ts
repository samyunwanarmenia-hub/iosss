import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.capacitorreact',
  appName: 'Capacitor React App',
  webDir: 'dist',
  server: {
    cleartext: true,
  },
};

export default config;
