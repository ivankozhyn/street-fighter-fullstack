import dbAdapter from '../config/db.js'
import { v4 } from 'uuid'

export class BaseRepository {
  constructor(collectionName) {
    this.dbContext = dbAdapter.data[collectionName]
    this.collectionName = collectionName
  }

  generateId() {
    return v4()
  }

  getAll() {
    return this.dbContext
  }

  getOne(search) {
    return this.dbContext.find(search)
  }

  create(data) {
    data.id = this.generateId()
    data.createdAt = new Date()
    this.dbContext.push(data)
    dbAdapter.write()
    return this.dbContext.find(it => it.id === data.id)
  }

  async update(id, dataToUpdate) {
    dataToUpdate.updatedAt = new Date()
    const updatedItemIndex = this.dbContext.findIndex(item => item.id === id)
    if (updatedItemIndex !== -1) {
      this.dbContext[updatedItemIndex] = {
        ...this.dbContext[updatedItemIndex],
        ...dataToUpdate,
      }
      await dbAdapter.write()
      return this.dbContext[updatedItemIndex]
    }
  }

  async delete(id) {
    const deletedItemIndex = this.dbContext.findIndex(item => item.id === id)
    if (deletedItemIndex !== -1) {
      const deletedUser = this.dbContext.filter(item => item.id === id)
      this.dbContext.splice(deletedItemIndex, 1)
      await dbAdapter.write()
      return deletedUser
    }
  }
}
