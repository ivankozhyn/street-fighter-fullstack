export const signInUserValid = (req, res, next) => {
  let errorsMessage
  if (Object.keys(req.body).length === 0) {
    errorsMessage = 'Empty login data.'
  }
  if (Object.keys(req.body).length > 2) {
    errorsMessage = 'Login data has wrong properties.'
  }

  if (errorsMessage) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}
