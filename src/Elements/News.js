import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => { 
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&country=${props.country}&category=${props.category}`
    setLoading(false);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(50);
    
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResults(parseData.totalResults);
    
    props.setProgress(100);
  }
  useEffect(()=> {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  },[])
  
  // const handlePreClick = async () => {
    
  //   setState({page: page - 1});
  //   updateNews();
  // }
  // const handleNextClick = async () => {
    
  //   setState({page: page + 1});
  //   updateNews();
  // }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}&country=${props.country}&category=${props.category}`
    setPage(page+1)
    // setState({loading : true});
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    
    console.log("FetchMore");
  };
    return (
      <>
      
        <h1 className="text-center my-5 ">NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
      <div className="container my-5">    
        <div className="row">
          {articles.map((element, index)=>{
            return <div className="col-md-4" key={index}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={!(element.author)?"Unknown":element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
        })}
        </div>
      </div>
        </InfiniteScroll>
      {/* <div className="container d-flex justify-content-around">
      <button disabled={page <=1} type="button" className="btn mb-5 btn-sm btn-dark" onClick={handlePreClick}>&larr; Previous</button>
      <button disabled={page + 1> Math.ceil(totalResults/props.pageSize)} type="button" className="btn mb-5 btn-sm btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div> */}
      </>
    );
  }

News.defaultTypes = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;