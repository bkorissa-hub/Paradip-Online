import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: '::',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    sitemap({
      hostname: 'https://paradiponline.com',
      dynamicRoutes: [
        '/sales',
        '/services',
        '/services/computer-and-laptop-repair',
        '/services/software-installation-support',
        '/services/custom-pc-builds',
        '/services/on-site-it-support',
        '/services/network-and-wifi-setup',
        '/services/cctv-and-security-solutions',
        '/support',
        '/about',
        '/blog',
        '/privacy-policy'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
