import React, { Component } from 'react';
import {Container, Navbar, Nav} from "react-bootstrap"
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddPage from './pages/AddPage/AddPage';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={(props) => (
              <HomePage {...props} />)} />
            {/* <Route exact path='/:id' render={(props) => (
        <DetailPage {...props} /> )} /> */}
            <Route exact path='/add' render={(props) => (
              <AddPage {...props} />)} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
        <Navbar bg="light" variant="light" fixed='top' >
                <Container>
                    <Navbar.Brand href="/">Lead Management</Navbar.Brand>
                    <Nav className="d-flex">
                        <Nav.Link href="/add">Add Leads</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
      </div>
    );
  }
}

export default App;
