import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component { 
  
  static defaultTypes = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1, 
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  async updateNews(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&country=${this.props.country}&category=${this.props.category}`
    this.setState({loading : true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseData.articles, 
      totalResults: parseData.totalResults,
      loading : false
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePreClick = async () => {
    
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }
  handleNextClick = async () => {
    
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&country=${this.props.country}&category=${this.props.category}`
    // this.setState({loading : true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles), 
      totalResults: parseData.totalResults,
      // loading : false
    })
    console.log("FetchMore");
  };
  render() {
    return (
      <>
      
        <h1 className="text-center my-5">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="container my-5">    
        <div className="row">
          {this.state.articles.map((element, index)=>{
            return <div className="col-md-4" key={index}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={!(element.author)?"Unknown":element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
        })}
        </div>
      </div>
        </InfiniteScroll>
      {/* <div className="container d-flex justify-content-around">
      <button disabled={this.state.page <=1} type="button" className="btn mb-5 btn-sm btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
      <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn mb-5 btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
      </>
    );
  }
}
