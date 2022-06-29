import { user } from '../models/user.js'

export const createUserValid = (req, res, next) => {
  const { id, ...rest } = user

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

export const updateUserValid = (req, res, next) => {
  let errorsMessage = validate(req.body)

  if (Object.keys(req.body).length === 0) errorsMessage = 'Nothing to update.'

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}

const validateEmail = mail => {
  return mail && mail.match(/^\w+([\.-]?\w+)*@gmail.com/)
}

const validatePhone = phoneNumber => {
  return phoneNumber && phoneNumber.match(/\+380[0-9]{9}$/)
}

const validatePassword = password => {
  return password && password.length >= 3
}

const validateLastName = lastName => {
  return lastName && typeof lastName === 'string'
}

const validateFirstName = firstName => {
  return firstName && typeof firstName === 'string'
}

const validate = newUser => {
  let error = ''

  Object.keys(newUser).forEach(prop => {
    switch (prop) {
      case 'email':
        if (!validateEmail(newUser[prop])) {
          error += 'Invalid email. \n'
        }
        break

      case 'password':
        if (!validatePassword(newUser[prop])) {
          error += 'Password must be min 3 characters. \n'
        }
        break

      case 'phoneNumber':
        if (!validatePhone(newUser[prop])) {
          error += 'Invalid number format. \n'
        }
        break

      case 'lastName':
        if (!validateLastName(newUser[prop])) {
          error += 'Invalid last name. \n'
        }
        break

      case 'firstName':
        if (!validateFirstName(newUser[prop])) {
          error += 'Invalid first name. \n'
        }
        break

      default:
        error += 'Add wrong properties. \n'
    }
  })

  return error
}
