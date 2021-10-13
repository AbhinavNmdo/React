import React, { useState, useEffect } from "react";
import NewsCards from "./NewsCards";
import Loading from "./Loading";
import "./css/News.css";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    props.setProgress(20);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(50);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsSpace - ${capitalizeFirstLetter(props.category)}`
    updateNews();
  }, [])

  const handlenextclick = async () => {
    setPage(page+1);
    updateNews();
  };

  const handleprevclick = async () => {
    setPage(page-1);
    updateNews();
  };
  
  const fetchMoreData = async ()=>{
    props.setProgress(10);
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(60);
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

    return (
      <>
        <div className="container text-center">
          {/* {loading && <Loading/>} */}
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
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading/>}
        > 
        <div className="container margin">
          <h1 id="news-heading">News - {capitalizeFirstLetter(props.category)}</h1>
          <div className="row">
            {articles.map((element) => {
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
            disabled={page <= 1}
            type="button"
            onClick={handleprevclick}
            className="btn btn-info"
          >
            Previous
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / 10)}
            type="button"
            onClick={handlenextclick}
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

News.defaultProps = {
  pageSize: 10,
  category: 'science'
};

export default News;
