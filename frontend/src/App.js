import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddPage from './pages/AddPage/AddPage';
import EditPage from './pages/EditPage/EditPage';
class App extends Component {
  render() {
    return (
      <div className="App">
       <BrowserRouter>
       <Switch>
       <Route exact path='/' render={(props) => (
        <HomePage {...props} /> )} />
        {/* <Route exact path='/:id' render={(props) => (
        <DetailPage {...props} /> )} /> */}
        <Route exact path='/add' render={(props) => (
        <AddPage {...props} /> )} />
        <Route exact path='/:id/update' render={(props) => (
        <EditPage {...props} /> )} />
        <Redirect to="/" />
       </Switch>
       </BrowserRouter>

      </div>
    );
  }
}

export default App;
