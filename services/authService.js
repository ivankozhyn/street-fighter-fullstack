import UserService from './userService.js'

class AuthService {
  login(userData) {
    const user = UserService.search(userData)
    if (!user) {
      return null
    }
    return user
  }
}

export default new AuthService()
