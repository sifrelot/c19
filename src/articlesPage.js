import React, {PureComponent} from 'react'
import { Container } from 'react-bootstrap'
import ArticleItem from './articleItem'
import { ARTICLES, AUTH } from './firebase'

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

  componentWillReceiveProps(nextProps) {
    this.setState({country:nextProps.country})
  }

  componentDidMount() {
    this.getArticles()
  }
  
  render() {
    return (
        <Container class="container-fluid">
            <span class="d-flex justify-content-center title" style={{margin:"10px"}}>Articles about COVID-19</span>
            <span class="btn btn-primary me-md-2">New Article...</span>
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