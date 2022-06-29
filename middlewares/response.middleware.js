const response404ErrorMiddleware = (req, res, next) => {
  if (res?.is404Error) {
    res.status(404).json({ error: true, message: res.message })
  } else {
    next()
  }
}

const response400ErrorMiddleware = (req, res, next) => {
  if (res?.is400Error) {
    res.status(400).json({ error: true, message: res.message })
  } else {
    next()
  }
}

export const responseMiddleware = [
  response404ErrorMiddleware,
  response400ErrorMiddleware,
  (req, res, next) => {
    res.status(200).json(res.data)
    next()
  },
]
