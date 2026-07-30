import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Team-Akari-Website/',
  server: {
    host: '0.0.0.0',
    allowedHosts: ['spaces.hackclub.com']
  }
})