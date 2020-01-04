import React , { Component } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import logo from './assets/logo_check_task.svg';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      email_handler: "",
      password_handler: "",
      login_error: false,
    }

    this.handlerInput = this.handlerInput.bind(this);
    this.appLogin = this.appLogin.bind(this);
  }

  handlerInput(e){
    if(e.target.name === "email"){
      this.setState({ email_handler: e.target.value });
    }else{
      if(e.target.name === "password"){
        this.setState({ password_handler: e.target.value });
      }
    }
  }

  appLogin(){
    axios.post('https://api-carrot.herokuapp.com/login', {
      user_email: this.state.email_handler,
      user_password: this.state.password_handler,
    }).then((api_response) => {
      if(api_response.data.log === false){
        this.setState({login_error: true});
      }else{
        this.setState({login_error: false});
        localStorage.setItem("check_task_token", api_response.data.token)
      }
      //console.log(api_response.data);

    }).catch((error) => {
      console.error(error);
    })
  }

  render(){
    return (
      <div className="App">
        <div className="container" >
  
          <div className="app-header">
            <img className="logo-app" width="200px" src={logo} alt="Check Task" />
          </div>
          
          <div className="form-container" >
          
            <div className="form_login container" >

                {this.state.login_error? 
                  
                  <div className="alert alert-danger" role="alert">
                    <strong>Login Erro!</strong> Your email or password is wrong!
                  </div>
                  : <div></div>
                }


                <h2 className="mb-5" >Login</h2>
                <div className="form-group">
                    <h5 >Email <i className="fas fa-envelope ml-2"></i> </h5>
                    <input type="email" name="email" className="form-control" onChange={this.handlerInput} />
                </div>
                <div className="form-group">
                    <h5 >Password <i className="fas fa-key ml-2"></i> </h5>
                    <input type="password" name="password" className="form-control" onChange={this.handlerInput} />
                </div>
                <button className="btn btn-primary container" onClick={this.appLogin} >Login <i className="fas fa-door-open ml-2"></i> </button>
                <h6  className="mt-3">You dont hava a acount? Let's make.</h6>
            </div>
  
          </div>
  
  
        </div>
      </div>
    );
  }
}

export default App;
