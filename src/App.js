import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import './App.css';

function App() {
  return (

      <BrowserRouter>
          <div className='App'>
                  <Navbar />
                  <div className='app-wrapper-content'>
                      {/*<Route path='/admission' component={Admission} />*/}
                      {/*<Route path='/directions' component={Directions} />*/}
                      {/*<Route path='/documents' component={Documents} />*/}
                      {/*<Route path='/isu' component={Isu} />*/}
                      {/*<Route path='/adm' component={Adm} />*/}
                  </div>
          </div>

      </BrowserRouter>

  );
}

export default App;
