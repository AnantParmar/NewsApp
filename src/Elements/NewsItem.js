import React from "react";
import news from '../news.jpg'
const NewsItem = (props) => {
  
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className="my-3">
        <div  className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '80%', zIndex:'1'}}>{source}</span>
          <img src={!(imageUrl)?news:imageUrl}  className="card-img-top" alt="..." />
          <div  className="card-body">
            <h5  className="card-title">{title}</h5>
            <p  className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}
export default NewsItem;