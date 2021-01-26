import React from 'react'
import './articleItem.css'

const ArticleItem = ({article, limit}) =>{
    let padTitle=""
    let padContent=""
    if (limit[0]<article["title"].length)
        padTitle="..."
    if (limit[1]<article["content"].length)
        padContent="..."
    const date = new Date(article["date"])
    return (
    <div className="card main">
        <div className="card-body">
            <h5 className="card-title">{article["title"].substr(0,limit[0]) + padTitle}</h5>
            <p className="card-text article-content">{article["content"].substr(0,limit[1]) + padContent}</p>
            <div className="col"><div className="d-flex justify-content-end author">{article["author"]}</div></div>
        </div>
        <div className="d-flex align-items-end">
            <div className="col"><div className="d-flex justify-content-start date">{`${date.getMonth()+1}/${date.getDate()+1}/${date.getFullYear()-2000} ${date.getHours()}:${date.getMinutes()}`}</div></div>
            <div className="col"><div className="d-flex justify-content-end country">{article["country"]}</div></div>
        </div>
    </div>)
}
export default ArticleItem