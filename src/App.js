import React from 'react';
import Header from './common/header'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <div className='main'>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/register' component={Register}></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
