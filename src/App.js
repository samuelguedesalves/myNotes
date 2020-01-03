import React from 'react';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div className='container pt-4' >

          <div className="card text-dark">
              <div className="card-body">
                  <h2 className="card-title">Login <i className="fas fa-flag"></i> </h2>
                  
                  <div className="" >
                      <div className="form-group">
                          <label >Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                      </div>
                      <div className="form-group">
                          <label >Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1"/>
                      </div>
                      <button className="btn btn-primary container">Submit</button>
                  </div>
              </div>
          </div>
          <h5 className='mt-2' >Created by: Samuel Guedes</h5>
        </div>
      
        

      </header>
    </div>
  );
}

export default App;
