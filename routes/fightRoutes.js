import { Router } from 'express'
import FightService from '../services/fightService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'
import {
  createFightValid,
  updateFightValid,
} from '../middlewares/fight.validation.middleware.js'

const router = Router()

router.get(
  '/',
  (req, res, next) => {
    try {
      const fights = FightService.getAll()
      res.data = fights
    } catch (err) {
      res.is404Error = true
      res.message = err.message
    } finally {
      next()
    }
  },
  responseMiddleware
)

router.get(
  '/:id',
  (req, res, next) => {
    try {
      const fight = FightService.search(fight => fight.id === req.params.id)
      if (fight) {
        res.data = fight
      } else {
        throw new Error('Fight does not exist.')
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

router.post(
  '/',
  createFightValid,
  (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const newFight = FightService.create(req.body)
        res.data = newFight
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

router.put(
  '/:id',
  updateFightValid,
  async (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const fight = await FightService.update(req.params.id, req.body)
        if (fight) {
          res.data = fight
        } else {
          throw new Error('Fight does not exist.')
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

router.delete(
  '/:id',
  async (req, res, next) => {
    try {
      const fight = await FightService.delete(req.params.id)
      if (fight) {
        res.data = fight
      } else {
        throw new Error('Fight does not exist.')
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
