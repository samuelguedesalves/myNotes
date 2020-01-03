import React from 'react';
//import logo from './logo.svg';
import logo from './assets/logo_check_task.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-body" >

        <div className="App-header">
          <img className="logo-app" src={logo} alt="Check Task" />
        </div>
        
        <div className="center-div">
          
          <div className='login-form' >
            <h3>Login</h3>
            <div className="inputs-form" >
              <input type="email" placeholder="E-mail" />
              <input type="password" placeholder="Password" />
            </div>
            <button className="button-login" >Login</button>
            <p> You not have a acount? <label className="link-create" >lest does create!</label> </p>
          </div>

        </div>


      </div>
    </div>
  );
}

export default App;
