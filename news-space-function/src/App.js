import './App.css';
// import About from './components/About';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = ()=> {
  // 4b9a730640b741a3ac715d982fa4f689
  let apikey = process.env.REACT_APP_NEWS_API
  
  const [progress, setProgress] = useState(0)
  return (
      <>
      <Router>
      <LoadingBar
        height={3}
        color='#CB35FF'
        progress={progress}
      />
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} apikey={apikey} key="science" category="science" pageSize={10}/>
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress} apikey={apikey} key="general" category="general" pageSize={10} />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} apikey={apikey} key="business" category="business" pageSize={10} />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} apikey={apikey} key="entertainment" category="entertainment" pageSize={10} />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} apikey={apikey} key="health" category="health" pageSize={10} />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} apikey={apikey} key="sports" category="sports" pageSize={10} />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} apikey={apikey} key="technology" category="technology" pageSize={10} />
          </Route>
        </Switch>
      </Router>
      </>
    )
}

export default App;