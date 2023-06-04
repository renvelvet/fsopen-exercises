const filterReducer = (state = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.data
  }
  return state
}

export const filter = (keyword) => {
  return { type: 'SET_FILTER', data: keyword }
}

export default filterReducer
