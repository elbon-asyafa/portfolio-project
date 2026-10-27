import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { handleChat } from './server/chat';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GEMINI_');
  return {
    plugins: [react(), {
      name: 'portfolio-chat-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', (req, res) => {
          void handleChat(req, res, { apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL });
        });
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
