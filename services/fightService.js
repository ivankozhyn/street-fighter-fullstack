import { fightRepository } from '../repositories/fightRepository.js'

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  search(search) {
    const item = fightRepository.getOne(search)
    if (!item) {
      return null
    }
    return item
  }

  create(fight) {
    const item = fightRepository.create(fight)
    if (!item) {
      return null
    }
    return item
  }

  getAll() {
    const item = fightRepository.getAll()
    if (!item) {
      return null
    }
    return item
  }

  update(id, dataToUpdate) {
    const item = fightRepository.update(id, dataToUpdate)
    if (!item) {
      return null
    }
    return item
  }

  delete(id) {
    const item = fightRepository.delete(id)
    if (!item) {
      return null
    }
    return item
  }
}

export default new FightersService()
