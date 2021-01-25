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

class SideArticles extends PureComponent {
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
      <Container className="container-fluid">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <h3>Related Articles</h3>
          </div>
          <ArticleItem article={article} limit={[25, 140]}/>
          <ArticleItem article={article} limit={[25, 140]}/>
          <ArticleItem article={article} limit={[25, 140]}/>
          <ArticleItem article={article} limit={[25, 140]}/>
          <ArticleItem article={article} limit={[25, 140]}/>
          <div className="d-flex justify-content-end">
            <a className="nav-link" href="/articles">more articles</a>
          </div>
        </div>
      </Container>
    )
  }
}
  
export default SideArticles;