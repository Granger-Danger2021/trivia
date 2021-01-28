let initialState = {
  name: '',
  score: 0,
  index: 0
};
export const incrementIndex = () => {
  return {
    type: 'INCREMENT'
  }
}
export const addToScore = () => {
  return {
    type: 'ADD'
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD':
      let newScore = state.score + 1;
      console.log('new score = ', newScore);
      return { ...state, score: newScore };
    case 'INCREMENT':
      let newIndex = state.index + 1;
      console.log('new index = ', newIndex);
      return { ...state, index: newIndex };
    default:
      return state;
  }
};


/// left to do:

/*
1- make the presentation
2- flip cards (tina) for the questions
3- general css styling/fonts/background colors
4- when quiz is done, display the answers??
5- when quiz is done, customize our message based on their score
*/