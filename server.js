const path = require('path')
const compression = require('compression')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const serve = (subpath, cache) => express.static(
	path.resolve(__dirname, subpath),
	{maxAge: cache && !dev ? 1000 * 60 * 60 * 24 * 30 : 0}
)

app.prepare()
.then(() => {
  const server = express()

  server.use(compression({threshold: 0}))
  server.use('/static', serve('./static', true))
  server.use('/service-worker.js', serve('./.next/service-worker.js', true))
  server.use('/manifest.json', serve('./static/manifest.json', true))

  server.get('/p/:id/:slug', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/pr/:id/:slug', (req, res) => {
    const actualPage = '/prestacion'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })
  
  server.get('/oo/:id/:slug', (req, res) => {
    const actualPage = '/oferta-on-line'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/c/:id/:slug', (req, res) => {
    const actualPage = '/category'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })
  
    server.get('/c-o-o/:id/:slug', (req, res) => {
      const actualPage = '/category-ofertas-on-line'
      const queryParams = { id: req.params.id }
      const queryParamsS = { id: req.params.slug }
      app.render(req, res, actualPage, queryParams, queryParamsS)
    })

  server.get('/m/:id/:slug', (req, res) => {
    const actualPage = '/mapa'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/l/:localidad/:slug', (req, res) => {
    const actualPage = '/localidad'
    const queryParams = { localidad: req.params.localidad }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/p-m/:localidad/:slug', (req, res) => {
    const actualPage = '/prestaciones-municipio'
    const queryParams = { localidad: req.params.localidad }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/p-c/:comunidad/:slug', (req, res) => {
    const actualPage = '/prestaciones-comunidad'
    const queryParams = { comunidad: req.params.comunidad }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/m-l/:localidad/:slug', (req, res) => {
    const actualPage = '/mapa-localidad'
    const queryParams = { localidad: req.params.localidad }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
  })

  server.get('/c-l/:id/:slug/:localidad/:slug', (req, res) => {
    const actualPage = '/category-localidad'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    const queryParamsL = { localidad: req.params.localidad }
    const queryParamsSL = {slug: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS, queryParamsL, queryParamsSL)
  })

  server.get('/m-c-l/:id/:slug/:localidad', (req, res) => {
    const actualPage = '/mapa-category-localidad'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    const queryParamsL = { localidad: req.params.localidad }
    app.render(req, res, actualPage, queryParams, queryParamsS, queryParamsL)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})