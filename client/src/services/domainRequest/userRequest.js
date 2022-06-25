import { post } from '../requestHelper'
import { USERS_ENTITY } from '../../constants/entities'
const entity = USERS_ENTITY

export const createUser = async body => {
  return await post(entity, body)
}
