import { VIEWED_USERS } from './Type'

const initialState = {
  users: [],
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEWED_USERS:
      const { users } = state
      const uniqUsers = users.filter((user) => user.id !== action.payload.id)
      return { ...state, users: [action.payload, ...uniqUsers] }
    default:
      return state
  }
}

export default Reducer
