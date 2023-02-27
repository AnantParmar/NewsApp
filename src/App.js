import './App.css';
import React, { Component } from 'react'
import Navbar from './Elements/Navbar';
import News from './Elements/News';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress:10
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar color="red" progress={this.state.progress}
    onLoaderFinished={() => this.setProgress(0)} />
        <Routes>
        <Route exact path="/"  element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general"/>} />
        <Route exact path="/business" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="business"/>} />
        <Route exact path="/entertainment" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="entertainment"/>} />
        <Route exact path="/health" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="health"/>} />
        <Route exact path="/science" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="science"/>} />
        <Route exact path="/sports" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="sports"/>} />
        <Route exact path="/technology" element={<News  setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="technology"/>} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

