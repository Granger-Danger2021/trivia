import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import trivia from './trivia';
import users from './users';
// import reducers and place inside combineReducers
let reducers = combineReducers({ trivia, users });

// finally, we get to actually create the store
const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();