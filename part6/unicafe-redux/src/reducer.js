const initialState = {
  good: 0,
  bad: 0,
  ok: 0,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 };
    case 'OK':
      return state;
    case 'BAD':
      return { ...state, bad: state.bad - 1 };
    case 'ZERO':
      return state;
    case 'DO NOTHING':
      return state;
    default:
      return state;
  }
};
