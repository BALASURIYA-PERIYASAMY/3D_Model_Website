import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Custom Vite plugin — serves the existing /flow and /img directories
 * as static assets without moving or copying any files.
 */
function serveLocalAssets() {
  const staticDirs = ['flow', 'img']

  return {
    name: 'serve-local-assets',
    configureServer(server) {
      staticDirs.forEach((dir) => {
        server.middlewares.use(`/${dir}`, (req, res, next) => {
          try {
            // Strip query string and leading slash
            const rawPath = req.url.split('?')[0].replace(/^\//, '')
            const filePath = path.join(__dirname, dir, decodeURIComponent(rawPath))

            if (!fs.existsSync(filePath)) return next()

            const ext = path.extname(filePath).toLowerCase()
            const mime =
              ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
              ext === '.png'  ? 'image/png'  :
              ext === '.webp' ? 'image/webp' :
              ext === '.mp4'  ? 'video/mp4'  :
              'application/octet-stream'

            res.setHeader('Content-Type', mime)
            res.setHeader('Cache-Control', 'public, max-age=3600')
            fs.createReadStream(filePath).pipe(res)
          } catch {
            next()
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveLocalAssets()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
