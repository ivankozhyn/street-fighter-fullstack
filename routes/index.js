import userRoutes from './userRoutes.js'
import authRoutes from './authRoutes.js'
import fighterRoutes from './fighterRoutes.js'
import fightRoutes from './fightRoutes.js'

const routes = app => {
  app.use('/api/users', userRoutes)
  app.use('/api/fighters', fighterRoutes)
  app.use('/api/fights', fightRoutes)
  app.use('/api/auth', authRoutes)
}

export default routes
