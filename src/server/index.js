import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr'
import Pino from 'pino'

const isProduction = process.env.NODE_ENV === 'production'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = `${__dirname}/../..`
const logger = Pino(
  isProduction
    ? {
        level: process.env.LOGLEVEL || 'info'
      }
    : {
        level: process.env.LOGLEVEL || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
      }
)

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  if (isProduction) {
    const sirv = await import('sirv')
    app.use(sirv.default(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddlewares = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddlewares)
  }

  // NOTE: For debugging
  // const pino = await import('pino-http')
  // app.use(pino.default({ logger }))

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    httpResponse.pipe(res)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  logger.info(`Server running at http://localhost:${port}`)
}
