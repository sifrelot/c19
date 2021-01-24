import React from 'react'
import './articleItem.css'

const ArticleItem = ({article}) => (
    <div class="card main">
        <div class="card-body">
            <h5 class="card-title">{article["title"]}</h5>
            <p class="card-text article-content">{article["content"]}</p>
            <div class="d-flex">
                <div class="col"><div class="d-flex justify-content-start date">{article["date"]}</div></div>
                <div class="col"><div class="d-flex justify-content-end country">{article["country"]}</div></div>
            </div>
        </div>
    </div>
)

export default ArticleItem