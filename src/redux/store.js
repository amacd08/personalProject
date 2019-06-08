import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import roundReducer from './courseReducer'

const rootReducer = combineReducers({
    user: userReducer,
    course: roundReducer
})

export default createStore(rootReducer,applyMiddleware(promiseMiddleware))