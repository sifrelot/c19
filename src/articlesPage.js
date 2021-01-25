import React, {PureComponent} from 'react'
import { Container } from 'react-bootstrap'
import AddArticle from './addArticle'
import ArticleItem from './articleItem'
import { ARTICLES, AUTH } from './firebase'
import './articlesPage.css'

const article = {
  title: "Tite de l'article",
  author: "moa",
  date: "aujourd'hui",
  content: "bonjour les amis ceci est juste un test pour voir si tout fonctionne correctement",
  country: "France",
}

var user = AUTH.currentUser;
var uid;
if (user != null) {
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}


class ArticlesPage extends PureComponent {
  state = {
    country: this.props.country,
    userName: localStorage.getItem('user'),
    addingArticle: false,
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

  handleAddArticleButton = () => {
    this.setState({addingArticle: true})
  }

  handleSubmit = ({title, country, content}) => {
    const {userName} = this.state
    let date = new Date()
    date = date.toISOString()
    console.log(title, country, content)
    this.setState({addingArticle: false})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({country:nextProps.country})
  }

  componentDidMount() {
    this.getArticles()
  }
  
  render() {
    const {addingArticle} = this.state
    let addArticles = false
    if (localStorage.getItem('addArticles'))
      addArticles = true
    return (
        <Container className="container-fluid">
            <span className="d-flex justify-content-center title">Articles about COVID-19</span>
            {(addArticles && !addingArticle) && <span className="btn btn-primary me-md-2" onClick={this.handleAddArticleButton}>New Article...</span>}
            {addingArticle && <AddArticle submit={this.handleSubmit}/>}
            <div className="d-flex align-content-start flex-wrap">
                <ArticleItem article={article} limit={[999, 1200]}/>
                <ArticleItem article={article} limit={[999, 1200]}/>
                <ArticleItem article={article} limit={[999, 1200]}/>
                <ArticleItem article={article} limit={[999, 1200]}/>
                <ArticleItem article={article} limit={[999, 1200]}/>
            </div>
        </Container>
    )
  }
}
  
export default ArticlesPage;