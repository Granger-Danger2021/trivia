import superagent from 'superagent';

//products reducer
let initialState = {
  questions: []
};

const shuffle = (array) => {
  console.log(array);
  //fisher-yates algorithm for shuffling an array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
export const get = () => async dispatch => {
  // console.log('iN GET ----------------=')
  return await superagent.get('https://dina-auth-api.herokuapp.com/api/v1/trivia')
    .then(response => {
      // console.log('RESPONSE BODY', response.body);
      //shuffle the array provided in place
      shuffle(response.body);
      dispatch(getQuestions({ questions: response.body }));;
    })
}

const getQuestions = payload => {
  // console.log('PAYLOAD COMIN THROUH GET QUESTIONS= ', payload);
  return {
    type: 'GET',
    payload: payload
  }
}


const triviaReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'GET':
      // console.log('PAYLOAD COMIN THROUgH switch statement = ', payload);
      return payload;
    default:
      // console.log('hello');
      return state;
  }
}

export default triviaReducer;