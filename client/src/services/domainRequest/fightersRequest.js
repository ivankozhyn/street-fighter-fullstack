import { get, post } from '../requestHelper'
import { FIGHTERS_ENTITY } from '../../constants/entities'

const entity = FIGHTERS_ENTITY

export const getFighters = async () => {
  return await get(entity)
}
export const getFighter = async id => {
  return await get(entity, id)
}

export const createFighter = async body => {
  return await post(entity, body)
}
