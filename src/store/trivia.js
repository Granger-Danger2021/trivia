import superagent from 'superagent';

//products reducer
let initialState = {
  questions: []
};

export const get = () => async dispatch => {
  console.log('iN GET ----------------=')
  return await superagent.get('https://dina-auth-api.herokuapp.com/api/v1/trivia')
    .then(response => {
      console.log('RESPONSE BODY', response.body);
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
      console.log('hello');
      return state;
  }
}

export default triviaReducer;