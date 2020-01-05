import React , { Component } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import logo from '../../assets/logo_check_task.svg';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      email_handler: "",
      password_handler: "",
      username_handler: "",
      login_error: false,
      login_window: true,
      create_account_error: false,
      requestApi: false,
    }

    this.handlerInput = this.handlerInput.bind(this);
    this.appLogin = this.appLogin.bind(this);
    this.alterWindow = this.alterWindow.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handlerInput(e){
    if(e.target.name === "email"){
      this.setState({ email_handler: e.target.value });
    }else{
      if(e.target.name === "password"){
        this.setState({ password_handler: e.target.value });
      }else{
        if(e.target.name === "username"){
          this.setState({ username_handler: e.target.value });
        }
      }
    }
  }

  appLogin(){
    this.setState({requestApi: true});
    axios.post('https://api-carrot.herokuapp.com/login', {
      user_email: this.state.email_handler,
      user_password: this.state.password_handler,
    }).then((api_response) => {
      if(api_response.data.log === false){
        this.setState({login_error: true, requestApi: false});
      }else{
        this.setState({login_error: false});
        localStorage.setItem("check_task_token", api_response.data.token);
        this.props.history.push('/dashboard');
      }
      //console.log(api_response.data);

    }).catch((error) => {
      console.error(error);
    })
  }

  alterWindow(e){
    //console.log(e.target.name);
    if(e.target.name === "bt_login"){
      this.setState({login_window: false, login_error: false, create_account_error: false,email_handler: "", password_handler: "", username_handler: "" });
    }else{
      if(e.target.name === "bt_create_account"){
        this.setState({login_window: true, email_handler: "", password_handler: "", username_handler: "" });
      }
    }
  }

  createAccount(){
    this.setState({requestApi: true});
    axios.post('https://api-carrot.herokuapp.com/new_user', {
      name_user: this.state.username_handler,
      email_user: this.state.email_handler,
      password_user: this.state.password_handler,
    }).then((api_response)=>{
      console.log(api_response.data);
      if(api_response.data.insert === true){
        //direcionar para o app
        localStorage.setItem("check_task_token", api_response.data.user_id);
        this.props.history.push("/dashboard");

      }else{
        this.setState({create_account_error: true, requestApi: false});
      }
    }).catch((api_error)=>{
      console.error(api_error);
    })
  }

  render(){
    return (
      <div className="App">
        <div className="container" >
  
          <div className="app-header">
            <img className="logo-app" width="200px" src={logo} alt="Check Task" />
          </div>
          {this.state.requestApi?
            <div className="loanding_container" >
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          : 
            <div className="form-container" >
              {this.state.login_window? 
              <div className="form_login container" >

                  {this.state.login_error? 
                    
                    <div className="alert alert-danger" role="alert">
                      <strong> <i className="fas fa-exclamation-triangle mr-1"></i> Login Erro!</strong> Your email or password is wrong!
                    </div>
                    : <div></div>
                  }


                  <h2 className="mb-5" >Login</h2>
                  <div className="form-group">
                      <h5 >Email <i className="fas fa-envelope ml-2"></i> </h5>
                      <input type="email" name="email" className="form-control" value={this.state.email_handler} onChange={this.handlerInput} />
                  </div>
                  <div className="form-group">
                      <h5 >Password <i className="fas fa-key ml-2"></i> </h5>
                      <input type="password" name="password" className="form-control" value={this.state.password_handler}  onChange={this.handlerInput} />
                  </div>
                  <button className="btn btn-primary container" onClick={this.appLogin} >Login <i className="fas fa-door-open ml-2"></i> </button>
                  <h6  className="mt-3">You dont have a acount? <button name="bt_login" onClick={this.alterWindow} className="btn text-warning btn-link">Let's make.</button> </h6>
              </div>
              :
              <div className="form_create_acount container">
                {this.state.create_account_error?
                  <div className="alert alert-danger" role="alert">
                    <strong> <i className="fas fa-exclamation-triangle mr-1"></i> Create Erro!</strong> Your email or password is wrong!
                  </div>
                :
                  <div></div>
                }
                <h2 className="mb-5">Create a account</h2>
                <div className="form-group" >
                  <h5>Username <i className="fas fa-user ml-2"></i> </h5>
                  <input name="username" type="text" className="form-control" value={this.state.username_handler} onChange={this.handlerInput} />
                </div>
                <div className="form-group" >
                  <h5>Email <i className="fas fa-envelope ml-2"></i> </h5>
                  <input name="email" type="email" className="form-control" value={this.state.email_handler} onChange={this.handlerInput}/>
                </div>
                <div className="form-group" >
                  <h5>Password <i className="fas fa-key ml-2"></i> </h5>
                  <input name="password" type="password" className="form-control" value={this.state.password_handler} onChange={this.handlerInput} />
                </div>
                <button className="btn btn-primary container" onClick={this.createAccount} >Create Account <i className="fas fa-arrow-alt-circle-right"></i> </button>
                <h6  className="mt-3">You have a acount? <button name="bt_create_account" onClick={this.alterWindow} className="btn text-warning btn-link">Let's Login.</button> </h6>
              </div>
              }
    
            </div>
          }
  
        </div>
      </div>
    );
  }
}

export default App;
