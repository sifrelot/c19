import React, {PureComponent} from 'react'
import { Container } from 'react-bootstrap'
import ArticleItem from './articleItem'
import { ARTICLES } from './firebase'

const article = {
  title: "Ceci est un titre beaucoup trop long",
  author: "moa",
  date: "aujourd'hui",
  content: "bonjour les amis ceci est juste un test pour voir si tout fonctionne correctement. bonjour les amis ceci est juste un test pour voir si tout fonctionne correctement",
  country: "France",
}

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

class SideArticles extends PureComponent {
  state = {
    country: this.props.country,
    articles: [],
  }

  async getArticles(props_country) {
    let {country} = this.state
    if (props_country)
      country = props_country
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
      list_articles.sort(sortDate)
      this.setState({articles: list_articles.slice(0,5)})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({country:nextProps.country})
    this.getArticles(nextProps.country)
  }

  componentDidMount() {
    this.getArticles()
  }
  
  render() {
    const {articles} = this.state
    return (
      <Container className="container-fluid">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <h3>Related Articles</h3>
          </div>
          {articles.sort(sortDate).map((article) => (
            <ArticleItem key={`${article.date}${article.author}`} article={article} limit={[25, 140]}/>
          ))}
          <div className="d-flex justify-content-end">
            <a className="nav-link" href="/articles">more articles</a>
          </div>
        </div>
      </Container>
    )
  }
}
  
export default SideArticles;