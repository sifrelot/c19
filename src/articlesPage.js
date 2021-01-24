import React, {PureComponent} from 'react'
import { Container } from 'react-bootstrap'
import AddArticle from './addArticle'
import ArticleItem from './articleItem'
import { ARTICLES, AUTH } from './firebase'
import './articlePage.css'

const article = {
  title: "Tite de l'article",
  author: "moa",
  date: "aujourd'hui",
  content: "bonjour les amis ceci est juste un test pour voir si tout fonctionne correctement",
  country: "France",
}

var user = AUTH.currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}


class ArticlesPage extends PureComponent {
  state = {
    country: this.props.country,
    user: this.props.user,
    addArticles: false,
    addingArticle: true,
    articles: [],
  }

  async getArticles() {
    const {country} = this.state
    let articles
    if (country==="Worldwide")
      articles = await ARTICLES.get()
    else
      articles = await ARTICLES.doc("Date").get() // get data from the database
    if (articles.exists) {
      articles = articles.data()
      if (articles!==undefined)
        this.setState({artciles: articles})
    }
  }
  
  async getAddAuth() {
    // requete pour savoir si l'utilisateur peut ajouter des articles
  }

  handleAddArticleClick() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({country:nextProps.country})
  }

  componentDidMount() {
    this.getArticles()
    this.getAddAuth()
  }
  
  render() {
    const {addArticles, addingArticle} = this.state
    return (
        <Container class="container-fluid">
            <span class="d-flex justify-content-center title title">Articles about COVID-19</span>
            {(addArticles && !addingArticle) && <span class="btn btn-primary me-md-2" onClick={this.handleAddArticleClick}>New Article...</span>}
            {addingArticle && <AddArticle/>}
            <div class="d-flex align-content-start flex-wrap">
                <ArticleItem article={article}/>
                <ArticleItem article={article}/>
                <ArticleItem article={article}/>
                <ArticleItem article={article}/>
                <ArticleItem article={article}/>
            </div>
        </Container>
    )
  }
}
  
export default ArticlesPage;