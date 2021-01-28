let initialState = {
  name:'',
  score: 0
};

export const addToScore = () => {
  return{
    type: 'ADD'
  }
}

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD':
      console.log(state.score);
      let newScore = state.score+1
    return {score: newScore}
    default:
      return state;
  }
};
