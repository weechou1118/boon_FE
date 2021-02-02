/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-25 15:59:11
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-02 17:41:47
 */

import {
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import reducers from './reducers'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// 存储对象，默认存储到localstorage
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    'chatList'
  ]
}


// 持续化存储包装reducer
const persistedReducer = persistReducer(persistConfig, reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  // 合并多个 enhancers 不然会报错
  composeEnhancers(applyMiddleware(thunk))
)


export const persistor = persistStore(store)