import { get, post, put, deleteReq } from '../requestHelper'
import { FIGHTS_ENTITY } from '../../constants/entities'

const entity = FIGHTS_ENTITY

export const getFights = async () => {
  return await get(entity)
}
export const getFight = async id => {
  return await get(entity, id)
}

export const createFight = async body => {
  return await post(entity, body)
}

export const putFight = async (id, body) => {
  return await put(entity, id, body)
}

export const deleteFight = async id => {
  return await deleteReq(entity, id)
}
