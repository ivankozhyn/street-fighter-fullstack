import { fighterRepository } from '../repositories/fighterRepository.js'

class FighterService {
  search(search) {
    const item = fighterRepository.getOne(search)
    if (!item) {
      return null
    }
    return item
  }

  create(fighter) {
    const item = fighterRepository.create(fighter)
    if (!item) {
      return null
    }
    return item
  }

  getAll() {
    const item = fighterRepository.getAll()
    if (!item) {
      return null
    }
    return item
  }

  update(id, dataToUpdate) {
    const item = fighterRepository.update(id, dataToUpdate)
    if (!item) {
      return null
    }
    return item
  }

  delete(id) {
    const item = fighterRepository.delete(id)
    if (!item) {
      return null
    }
    return item
  }
}

export default new FighterService()
