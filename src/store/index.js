import { createStore } from 'redux'
import reducers from './reducers'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// 存储对象，默认存储到localstorage
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

// 重新组装reducer
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store)