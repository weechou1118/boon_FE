import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 存储对象，默认存储到localstorage
const persistConfig = {
  key: 'root',
  storage,
}
// 重新组装reducer
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer
)

export const persistor = persistStore(store)