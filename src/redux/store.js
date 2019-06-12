import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import roundReducer from './roundReducer'
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
    user: userReducer,
    course: courseReducer,
    round: roundReducer
})

export default createStore(rootReducer,applyMiddleware(promiseMiddleware))