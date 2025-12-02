import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to resolve "Property 'cwd' does not exist on type 'Process'"
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This ensures process.env.API_KEY in your code works after build
      // We check env vars from files (env.*) and system env vars (process.env.*)
      // Explicitly including process.env.VITE_API_KEY is crucial for Vercel
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || process.env.API_KEY || process.env.VITE_API_KEY)
    }
  };
});