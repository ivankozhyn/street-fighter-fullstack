import { Router } from 'express'
import AuthService from '../services/authService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'
import { signInUserValid } from '../middlewares/auth.validation.middleware.js'

const router = Router()

router.post(
  '/login',
  signInUserValid,
  (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const user = AuthService.login(
          user =>
            user.email === req.body.email && user.password === req.body.password
        )
        if (user) {
          res.data = user
        } else {
          throw new Error('User does not exist.')
        }
      }
    } catch (err) {
      res.is404Error = true
      res.message = err.message
    } finally {
      next()
    }
  },
  responseMiddleware
)

export default router
