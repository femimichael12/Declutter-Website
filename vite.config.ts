import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { handlePaystackInitialize, handlePaystackVerify } from './api/paystackService';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.PAYSTACK_SECRET_KEY) {
    process.env.PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY;
  }
  if (env.PAYSTACK_TEST_SECRET_KEY) {
    process.env.PAYSTACK_TEST_SECRET_KEY = env.PAYSTACK_TEST_SECRET_KEY;
  }

  return {
    plugins: [
      react(),
      {
        name: 'paystack-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const parsedUrl = new URL(req.url || '', 'http://localhost');
            const pathname = parsedUrl.pathname;

            if (pathname === '/api/paystack/initialize') {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

              if (req.method === 'OPTIONS') {
                res.statusCode = 200;
                res.end();
                return;
              }

              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.end(JSON.stringify({ status: false, message: 'Method Not Allowed' }));
                return;
              }

              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  const body = bodyStr ? JSON.parse(bodyStr) : {};
                  const result = await handlePaystackInitialize(body);
                  res.statusCode = 200;
                  res.end(JSON.stringify(result));
                } catch (err: any) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ status: false, message: err.message || 'Payment initialization failed' }));
                }
              });
              return;
            }

            if (pathname === '/api/paystack/verify') {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

              if (req.method === 'OPTIONS') {
                res.statusCode = 200;
                res.end();
                return;
              }

              const refParam = parsedUrl.searchParams.get('reference');
              if (refParam) {
                try {
                  const result = await handlePaystackVerify(refParam);
                  res.statusCode = 200;
                  res.end(JSON.stringify(result));
                } catch (err: any) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ status: false, message: err.message || 'Verification failed' }));
                }
                return;
              }

              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  const body = bodyStr ? JSON.parse(bodyStr) : {};
                  const ref = body.reference;
                  if (!ref) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ status: false, message: 'Reference is required' }));
                    return;
                  }
                  const result = await handlePaystackVerify(ref);
                  res.statusCode = 200;
                  res.end(JSON.stringify(result));
                } catch (err: any) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ status: false, message: err.message || 'Verification failed' }));
                }
              });
              return;
            }

            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
            ui: ['framer-motion', 'lucide-react'],
          },
        },
      },
    },
  };
});
