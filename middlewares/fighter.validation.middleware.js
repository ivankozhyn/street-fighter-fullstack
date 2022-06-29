import { fighter } from '../models/fighter.js'

export const createFighterValid = (req, res, next) => {
  const { id, ...rest } = fighter

  Object.keys(rest).forEach(prop => {
    prop === 'health' ? (rest[prop] = 100) : (rest[prop] = '')
  })

  const data =
    Object.keys(req.body).length !== Object.keys(rest).length
      ? { ...rest, ...req.body }
      : req.body

  const errorsMessage = validate(data)

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  req.body = data
  next()
}

export const updateFighterValid = (req, res, next) => {
  let errorsMessage = validate(req.body)

  if (Object.keys(req.body).length === 0) errorsMessage += 'Nothing to update'

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}

const validatePower = power => {
  return power && power <= 100 && power >= 1
}

const validateHealth = health => {
  return health && health <= 120 && health >= 80
}

const validateDefense = defense => {
  return defense && defense <= 10 && defense >= 1
}

const validateName = name => {
  return name && typeof name === 'string'
}

const validate = newFighter => {
  let error = ''

  Object.keys(newFighter).forEach(prop => {
    switch (prop) {
      case 'health':
        if (!validateHealth(newFighter[prop])) {
          error += 'Invalid health. \n'
        }
        break

      case 'defense':
        if (!validateDefense(newFighter[prop])) {
          error += 'Invalid defense. \n'
        }
        break

      case 'power':
        if (!validatePower(newFighter[prop])) {
          error += 'Invalid power. \n'
        }
        break

      case 'name':
        if (!validateName(newFighter[prop])) {
          error += 'Invalid name. \n'
        }
        break

      default:
        error += 'Wrong properties. \n'
    }
  })

  return error
}
