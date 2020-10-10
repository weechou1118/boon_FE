import React from 'react';
import Header from './common/header'
import Footer from './common/footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'

import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import LoginOut from './pages/loginout'
import Activate from './pages/register/activate'
import Success from './pages/register/success'

import './wrapper.less'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <div id='Wrapper'>
            <div className='content'>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/loginout' component={LoginOut}></Route>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/register/activate' component={Activate}></Route>
              <Route exact path='/register/success' component={Success}></Route>
            </div>
          </div>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
