import './App.css';
import React, { useState } from 'react'
import Navbar from './Elements/Navbar';
import News from './Elements/News';
import { BrowserRouter,Routes,Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';
const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  
  const [progress, setProgress] = useState(10);
  // setProgress(progress);
  // setProgress = (progress) => {
  //   setState({progress: progress})
  // }
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar color="red" progress={progress}
    onLoaderFinished={() => setProgress(0)} />
        <Routes>
        <Route exact path="/"  element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general"/>} />
        <Route exact path="/business" element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="business"/>} />
        <Route exact path="/entertainment" element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment"/>} />
        <Route exact path="/health" element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="health"/>} />
        <Route exact path="/science" element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="science"/>} />
        <Route exact path="/sports" element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="sports"/>} />
        <Route exact path="/technology" element={<News  setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="technology"/>} />
        </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;