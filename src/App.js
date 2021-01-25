import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './navBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './notFound';
import Home from './home';
import ScrollToTop from 'react-scroll-up';
import ArticlesPage from './articlesPage';
import { AUTH, ADD_ARTICLES, googleAuth } from './firebase';

class App extends Component {
  state = {
    user: AUTH.currentUser,
  }

  async connectUser(user) {
    const firestore_data = await ADD_ARTICLES.where("uid", "==", user.uid).get() // get info from firebase
    if (!firestore_data.empty)
      localStorage.setItem('addArticles', "true")

    localStorage.setItem('user', `${user.displayName}`)
    window.location.reload(false);
  }

  // fix this
  handleLog = () => {
    if (localStorage.getItem('user')) {
      AUTH.signOut().then(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('addArticles')
        window.location.reload(false);
      }).catch((error) => {
        console.log(error.message)
      })}
    else {
      AUTH.signInWithPopup(googleAuth).then((res) => {
        this.connectUser(res.user)
      }).catch((error) => {
        console.log(error.message)
      })
    }
  }

  render() {
    return (
      <div>
        <NavBar onClickLog={this.handleLog}/>
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
