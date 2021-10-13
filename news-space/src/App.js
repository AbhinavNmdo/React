import './App.css';
// import About from './components/About';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  // 4b9a730640b741a3ac715d982fa4f689
  apikey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render(){
  return (
      <>
      <Router>
      <LoadingBar
        height={3}
        color='#CB35FF'
        progress={this.state.progress}
      />
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <News setProgress={this.setProgress} apikey={this.apikey} key="science" category="science" pageSize={10}/>
          </Route>
          <Route exact path="/general">
            <News setProgress={this.setProgress} apikey={this.apikey} key="general" category="general" pageSize={10} />
          </Route>
          <Route exact path="/business">
            <News setProgress={this.setProgress} apikey={this.apikey} key="business" category="business" pageSize={10} />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" category="entertainment" pageSize={10} />
          </Route>
          <Route exact path="/health">
            <News setProgress={this.setProgress} apikey={this.apikey} key="health" category="health" pageSize={10} />
          </Route>
          <Route exact path="/sports">
            <News setProgress={this.setProgress} apikey={this.apikey} key="sports" category="sports" pageSize={10} />
          </Route>
          <Route exact path="/technology">
            <News setProgress={this.setProgress} apikey={this.apikey} key="technology" category="technology" pageSize={10} />
          </Route>
        </Switch>
      </Router>
      </>
    )
  }
}

