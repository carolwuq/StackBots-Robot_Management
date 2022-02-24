import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import appReducer from './redux'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

let middleware = [
  thunkMiddleware.withExtraArgument({ axios })
]
if (process.browser) {
  // The redux logger to only log messages when it's running in the
  // browser, and not when we run the tests from within Mocha.
  middleware = [...middleware, createLogger({ collapsed: true })]
}

/** Wrap the entire redux store in a root reducer with a special
 * action, RESET_STORE. It calls our application's reducer with
 * state = undefined. This will trigger each of our sub-reducers
 * to reset back to their initial state. This will come in
 * handy when we need to reset our redux store in between tests.
 */
const RESET_STORE = 'RESET_STORE'

export const resetStore = () => ({ type: RESET_STORE })

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined
    return appReducer(state, action)
  }
  return appReducer(state, action)
}

export default createStore(
  rootReducer,
  // 👇 This uses the Redux DevTools extension.
  // 👇 See: https://github.com/zalmoxisus/redux-devtools-extension
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)
