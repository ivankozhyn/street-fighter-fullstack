import express from 'express'
import cors from 'cors'

import routes from './routes/index.js'
import('./config/db.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)

app.use('/', express.static('./client/build'))

const port = process.env.PORT || 3050
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

export default app
