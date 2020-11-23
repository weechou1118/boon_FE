import React, { lazy, Suspense } from 'react';
import Header from './common/header'
import Footer from './common/footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'

import Home from './pages/home'
import Register from './pages/register'
import LoginOut from './pages/loginout'
import Activate from './pages/register/activate'
import Success from './pages/register/success'
import Article from './pages/article'
import New from './pages/new'
import NotFound from './pages/404'

import './wrapper.less'

const Login = lazy(() => import(/* webpackChunkName: "login" */'./pages/login'))

function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <Header />
            <div id='Wrapper' className={props.history}>
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
