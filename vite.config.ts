import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let env = loadEnv(mode, process.cwd(), '');

  // Fallback: manually read .env file if loadEnv fails (WebContainer compatibility)
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const envLines = envContent.split('\n');

      envLines.forEach(line => {
        const match = line.match(/^([^=:#]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          if (key && value) {
            env[key] = value;
          }
        }
      });
    } catch (error) {
      console.error('Failed to read .env file:', error);
    }
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        'react-slick': 'react-slick/lib/index.js',
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react-slick', 'slick-carousel'],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react', 'react-slick', 'slick-carousel'],
            'supabase-vendor': ['@supabase/supabase-js'],
          },
        },
      },
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || 'https://vspkiuissuuesjsnnpqr.supabase.co'),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcGtpdWlzc3V1ZXNqc25ucHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTM1ODAsImV4cCI6MjA3NTkyOTU4MH0.pcl5Z0DDpFj8Qu6J4KQZINUQTrJhIMalRTRlLyqIfRk'),
    },
  };
});
