import './App.css';
import NavBar from './Component/NavBar';
import React, { useState } from 'react'
import News from './Component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=>{
  const [progress, setProgress] = useState(0)
  const apiKey =f13df8c72d794712bd228cd99abdcdec
    const pageSize = 9
    return (
      <div>
        <Router>
          <LoadingBar
          height={3}
          loaderSpeed={75}
            color='#f11946' 
            progress={progress}
          />
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} category='general' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} category='entertainment' />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} category='health' />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} category='science' />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} category='sports' />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} category='technology' />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} category='business' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }

  export default App

