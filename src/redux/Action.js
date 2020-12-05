import { VIEWED_USERS } from './Type'

export const checkLastViewedUser = (data) => {
  return {
    type: VIEWED_USERS,
    payload: data,
  }
}
