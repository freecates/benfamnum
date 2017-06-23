const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id/:slug', (req, res) => {
    const actualPage = '/post'
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

  server.get('/m/:id/:slug', (req, res) => {
    const actualPage = '/mapa'
    const queryParams = { id: req.params.id }
    const queryParamsS = { id: req.params.slug }
    app.render(req, res, actualPage, queryParams, queryParamsS)
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