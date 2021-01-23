import React, { Component } from 'react'
import './App.css';
import {Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './navBar';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import NotFound from './notFound';
import Home from './home';
import Country from './country';
import ScrollToTop from 'react-scroll-up';

class App extends Component {
  state = {
    connected: false,
  }

  // fix this
  handleLog = () => {
    const {connected} = this.state
    if (connected===true)
      this.setState({connected: false})
    else
      this.setState({connected: true})
  }

  render() {
    const {connected} = this.state
    return (
      <div>
        <NavBar connected={connected} onClickLog={this.handleLog}/>
        <header className="App-header">
        </header>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/articles">
                <Country/>
              </Route>
              <Route path="*">
                <NotFound/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <footer>
          <Alert className="alert alert-primary" role="alert" >
            <div class="d-grid gap-2 d-md-flex justify-content-md">
              <span class="me-auto">Data Source: <a href="https://covid19api.com/" target="_blank">COVID-19 API / Johns Hopkins CSEE</a></span>
            </div>
          </Alert>
        </footer>
        <ScrollToTop showUnder={160}>
          <button class="btn btn-primary me-md-2" type="button" onClick={()=>{window.scroll(0,0)}}>Head</button>
        </ScrollToTop>
      </div>
    )
  }
}

export default App;
