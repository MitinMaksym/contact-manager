import { createStore, applyMiddleware, compose } from 'redux'
import contactsReducer from './reducers/contacts'
import createSagaMiddleware from 'redux-saga'
import { sagaWatcher } from './sagas'

const saga = createSagaMiddleware()
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose

const store = createStore(
  contactsReducer,
  composeEnhancers(applyMiddleware(saga))
)

saga.run(sagaWatcher)
export default store
