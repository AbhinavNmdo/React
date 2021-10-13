import React, { Component } from "react";
import NewsCards from "./NewsCards";
import Loading from "./Loading";
import "./css/News.css";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 10,
    category: 'science'
  };
  
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello i am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title = `NewsSpace - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.props.setProgress(20);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: 0
    });
    this.props.setProgress(100);
  }


  async componentDidMount() {
    this.updateNews();
  }

  handlenextclick = async () => {
    this.setState({page: this.state.page + 1});
    this.updateNews();
  };

  handleprevclick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  };
  
  fetchMoreData = async ()=>{
    this.props.setProgress(10);
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(60);
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(100);
  };

  render() {
    return (
      <>
        <div className="container text-center">
          {/* {this.state.loading && <Loading/>} */}
        </div>
        <div id="header">
          <h1 align="center" id="header-title">
            Welcome to NewsSpace
          </h1>
          <p align="center" id="header-para">
            You can find Space related News Daily
          </p>
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        > 
        <div className="container margin">
          <h1 id="news-heading">News - {this.capitalizeFirstLetter(this.props.category)}</h1>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <NewsCards
                  key={element.url}
                  title={element.title}
                  desc={element.description}
                  image={element.urlToImage}
                  url={element.url}
                  published={element.publishedAt}
                />
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handleprevclick}
            className="btn btn-info"
          >
            Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 10)}
            type="button"
            onClick={this.handlenextclick}
            className="btn btn-info"
          >
            Next
          </button>
        </div> */}
        <br />
        <br />
        <br />
      </>
    );
  }
}

export default News;
