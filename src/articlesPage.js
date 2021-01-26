import React, {PureComponent} from 'react'
import { Container } from 'react-bootstrap'
import AddArticle from './addArticle'
import ArticleItem from './articleItem'
import { ARTICLES } from './firebase'
import './articlesPage.css'

function sortDate(a, b) {
  const date_a = new Date(a["date"])
  const date_b = new Date(b["date"])
  if (date_a.getTime() < date_b.getTime()) {
    return 1;
  } else if (date_a.getTime() > date_b.getTime()) {
    return -1;
  }
  return 0;
}


class ArticlesPage extends PureComponent {
  state = {
    country: this.props.country,
    userName: localStorage.getItem('user'),
    addingArticle: false,
    articles: [],
  }

  async getArticles() {
    let {country} = this.state
    if (country===undefined)
      country = "Worldwide"
    let articles
    if (country==="Worldwide")
      articles = await ARTICLES.get()
    else if (country!==undefined)
      articles = await ARTICLES.where("country","==", country).get() // get data from the database
    if (!articles.empty) {
      let list_articles = []
      articles = articles.docs
      for (let test in articles)
        list_articles = [articles[test].data(), ...list_articles]
      this.setState({articles: list_articles})
    }
  }

  async addArticle({title, country, content}) {
    const {userName, articles} = this.state
    let date = new Date()
    date = date.toISOString()
    const article = {title: title, country: country, date: date, content: content, author: userName}
    await ARTICLES.add(article) // the new article to the firestore database
    this.setState({addingArticle: false, articles: [article, ...articles]})
  }

  handleAddArticleButton = () => {
    this.setState({addingArticle: true})
  }

  handleSubmit = ({title, country, content}) => {
    this.addArticle({title, country, content})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({country:nextProps.country})
  }

  componentDidMount() {
    this.getArticles()
  }
  
  render() {
    const {addingArticle, articles} = this.state
    let addArticles = false
    if (localStorage.getItem('addArticles'))
      addArticles = true
    return (
      <Container className="container-fluid">
        <span className="d-flex justify-content-center title">Articles about COVID-19</span>
        {(addArticles && !addingArticle) && <span className="btn btn-primary me-md-2" onClick={this.handleAddArticleButton}>New Article...</span>}
        {addingArticle && <AddArticle submit={this.handleSubmit}/>}
        <div className="d-flex align-content-start flex-wrap">
          {articles.sort(sortDate).map((article) => (
            <ArticleItem key={`${article.date}${article.author}`} article={article} limit={[999, 9999]}/>
          ))}
        </div>
      </Container>
    )
  }
}
  
export default ArticlesPage;