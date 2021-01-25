import React, { Component } from 'react'
import './App.css';
import {Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './navBar';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import NotFound from './notFound';
import Home from './home';
import ScrollToTop from 'react-scroll-up';
import ArticlesPage from './articlesPage';
import { AUTH, googleAuth } from './firebase';

class App extends Component {
  state = {
    user: AUTH.currentUser,
  }

  // fix this
  handleLog = () => {
    const {user} = this.state
    if (user){
      AUTH.signOut().then(() => {
        this.setState({user: AUTH.currentUser})
      }).catch((error) => {
        console.log(error.message)
      });}
    else {
      AUTH.signInWithPopup(googleAuth).then((res) => {
        console.log(res.user)
        this.setState({user: AUTH.currentUser})
      }).catch((error) => {
        console.log(error.message)
      })
    }
  }

  render() {
    const {connected, user} = this.state
    return (
      <div>
        <NavBar connected={connected} user={user} onClickLog={this.handleLog}/>
        <header className="App-header">
        </header>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/articles">
                <ArticlesPage/>
              </Route>
              <Route path="*">
                <NotFound/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <ScrollToTop showUnder={160}>
          <div className="btn btn-primary me-md-2" type="button" onClick={()=>{window.scroll(0,0)}}>Head</div>
        </ScrollToTop>
      </div>
    )
  }
}

export default App;
