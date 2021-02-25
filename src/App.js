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
import Register from './pages/register'
import LoginOut from './pages/loginout'
import Activate from './pages/register/activate'
import Success from './pages/register/success'
import Article from './pages/article'
import New from './pages/new'
import SettingMe from './pages/settingMe'
import NotFound from './pages/404'
import Notifications from './pages/noti'
import Login from './pages/login'

import './wrapper.less'

// const Login = lazy(() => import(/* webpackChunkName: "login" */'./pages/login'))
// 懒加载
let Chat = Load(() => import('./pages/chat'))
let Member = Load(() => import('./pages/member'))
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
