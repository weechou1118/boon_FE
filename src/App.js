import React from 'react';
import Header from './common/header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import LoginOut from './pages/loginout'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header></Header>
          <div className='main'>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/loginout' component={LoginOut}></Route>
            <Route exact path='/register' component={Register}></Route>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
