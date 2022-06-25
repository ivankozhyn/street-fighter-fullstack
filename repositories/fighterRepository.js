import { BaseRepository } from './baseRepository.js'

class FighterRepository extends BaseRepository {
  constructor() {
    super('fighters')
  }
}

export const fighterRepository = new FighterRepository()
