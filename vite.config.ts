import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import initializeHandler from './api/paystack/initialize';
import verifyHandler from './api/paystack/verify';

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

            // Helper to wrap Node http.ServerResponse to support Vercel res.status().json()
            function createVercelResponse(rawRes: any) {
              return {
                setHeader(name: string, value: string) {
                  rawRes.setHeader(name, value);
                  return this;
                },
                status(code: number) {
                  rawRes.statusCode = code;
                  return {
                    json(data: any) {
                      rawRes.setHeader('Content-Type', 'application/json');
                      rawRes.end(JSON.stringify(data));
                    },
                    end() {
                      rawRes.end();
                    },
                  };
                },
                json(data: any) {
                  rawRes.setHeader('Content-Type', 'application/json');
                  rawRes.end(JSON.stringify(data));
                },
                end() {
                  rawRes.end();
                },
              };
            }

            if (pathname === '/api/paystack/initialize') {
              let bodyStr = '';
              req.on('data', (chunk: any) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  const body = bodyStr ? JSON.parse(bodyStr) : {};
                  const wrappedReq = Object.assign(req, { body, query: Object.fromEntries(parsedUrl.searchParams) });
                  const wrappedRes = createVercelResponse(res);
                  await initializeHandler(wrappedReq, wrappedRes);
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ status: false, message: err.message || 'Server error' }));
                }
              });
              return;
            }

            if (pathname === '/api/paystack/verify') {
              let bodyStr = '';
              req.on('data', (chunk: any) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  const body = bodyStr ? JSON.parse(bodyStr) : {};
                  const wrappedReq = Object.assign(req, { body, query: Object.fromEntries(parsedUrl.searchParams) });
                  const wrappedRes = createVercelResponse(res);
                  await verifyHandler(wrappedReq, wrappedRes);
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ status: false, message: err.message || 'Server error' }));
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
