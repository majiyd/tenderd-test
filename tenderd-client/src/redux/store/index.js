import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

/**
 * @desc This is the store which holds the global state of the entire app. it creates the store using redux inbuilt createStore function. createStore function takes an argument which is a reducer. In this case, our reducer is rootReducer
 * @type Constant
 * @param rootReducer
 */
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store