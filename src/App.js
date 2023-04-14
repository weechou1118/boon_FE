/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-24 11:14:16
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-22 17:29:25
 */

import React, { Suspense } from 'react';
import Header from './common/header'
import Footer from './common/footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'
import Load from './utils/lazy'

import Home from './pages/home'

import './wrapper.less'

// const Login = lazy(() => import(/* webpackChunkName: "login" */'./pages/login'))
// 懒加载
let Login = Load(() => import('./pages/login'))
let Register = Load(() => import('./pages/register'))
let LoginOut = Load(() => import('./pages/loginout'))
let Activate = Load(() => import('./pages/register/activate'))
let Success = Load(() => import('./pages/register/success'))
let Article = Load(() => import('./pages/article'))
let New = Load(() => import('./pages/new'))
let SettingMe = Load(() => import('./pages/settingMe'))
let NotFound = Load(() => ('./pages/404'))
let Chat = Load(() => import('./pages/chat'))
let Member = Load(() => import('./pages/member'))
let Notifications = Load(() => import('./pages/noti'))
let Collection = Load(() => import('./pages/collection'))

function App (props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense fallback={<div></div>}>
            <Header />
            <div id='Wrapper'>
              <div className='content'>
                <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/login' component={Login}></Route>
                  <Route exact path='/loginout' component={LoginOut}></Route>
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/register/activate' component={Activate}></Route>
                  <Route exact path='/register/success' component={Success}></Route>
                  <Route exact path='/article/:id' component={Article}></Route>
                  <Route exact path='/new' component={New}></Route>
                  <Route exact path='/chat' component={Chat}></Route>
                  <Route exact path='/chat/:mid' component={Chat}></Route>
                  <Route exact path='/collection/:where' component={Collection}></Route>
                  <Route path='/member/:nickname' component={Member}></Route>
                  <Route path='/settingMe' component={SettingMe}></Route>
                  <Route path='/notifications' component={Notifications}></Route>
                  <Route component={NotFound}></Route>
                </Switch>
              </div>
            </div>
            <Footer />
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
