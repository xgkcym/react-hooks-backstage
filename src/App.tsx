import React from 'react';
import './App.css';
import Login from './pages/Login'
import Admin from './pages/Admin'
import { Switch, Route, Redirect } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/admin' component={Admin} />
          <Redirect to='/login' />
        </Switch>
    </div>
  );
}

export default App;
