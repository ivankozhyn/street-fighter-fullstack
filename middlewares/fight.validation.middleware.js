import { fight } from '../models/fight.js'

export const createFightValid = (req, res, next) => {
  const { id, ...rest } = fight

  const data =
    Object.keys(req.body).length !== Object.keys(rest).length
      ? { ...rest, ...req.body }
      : req.body

  const errorsMessage = validate(data)

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}

export const updateFightValid = (req, res, next) => {
  let errorsMessage = validate(req.body)

  if (Object.keys(req.body).length === 0) {
    errorsMessage = 'Nothing to update.'
  }

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}

const validateFighterId = id => {
  return id && typeof id === 'string'
}

const validateLog = log => {
  const validatedLog = log.filter(item => Object.keys(item).length === 4)
  return validatedLog.length === log.length
}

const validate = newFight => {
  let error = ''

  Object.keys(newFight).forEach(prop => {
    switch (prop) {
      case 'fighter1':
        if (!validateFighterId(newFight[prop])) {
          error += 'Invalid fighter1 id. \n'
        }
        break
      case 'fighter2':
        if (!validateFighterId(newFight[prop])) {
          error += 'Invalid fighter2 id. \n'
        }
        break
      case 'log':
        if (!validateLog(newFight[prop])) {
          error += 'Invalid Log. \n'
        }
        break
      default:
        error += 'Add wrong properties. \n'
    }
  })

  return error
}
