export const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res?.is404Error) {
    res.status(404).json({ error: true, message: res.message })
  } else if (res?.is400Error) {
    res.status(400).json({ error: true, message: res.message })
  } else res.status(200).json(res.data)
  next()
}
