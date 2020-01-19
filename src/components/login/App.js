import React , { Component } from 'react';
import logo from '../../assets/MyNotes_logo.svg';
import './App.css';

import api from '../../services/api';

import * as Icon from 'react-feather';


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

  async appLogin(){
    this.setState({requestApi: true});

    const response = await api.post('/auth/authenticate', {
      email: this.state.email_handler,
      password: this.state.password_handler,
    });

    if(!response){
      this.setState({login_error: true, requestApi: false});
    }else{
      localStorage.setItem("token", response.data.token);
      this.props.history.push('/dashboard');
    }

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

  async createAccount(){
    this.setState({requestApi: true});

    const response = await api.post('/auth/register',{
      name: this.state.username_handler,
      email: this.state.email_handler,
      password: this.state.password_handler
    });

    if( !response ){
      this.setState({ requestApi: false, create_account_error: true });
    }else{
      localStorage.setItem("token", response.data.token);
      this.props.history.push("/dashboard");
    }
    /*
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
    */
  }

  render(){
    return (
      <div className="App">
        <div className="container" >
  
          <div className="app-header">
            <img className="logo-app" width="180px" src={logo} alt="Check Task" />
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


                  <h2 className="mb-5" > <strong>Login</strong> </h2>
                  <div className="form-group">
                      <h5 >Email <Icon.Mail/> </h5>
                      <input type="email" name="email" className="form-control" value={this.state.email_handler} onChange={this.handlerInput} />
                  </div>
                  <div className="form-group">
                      <h5 >Password <Icon.Key/> </h5>
                      <input type="password" name="password" className="form-control" value={this.state.password_handler}  onChange={this.handlerInput} />
                  </div>
                  <button id='button_login' className="btn btn-primary container" onClick={this.appLogin} >Login <Icon.LogIn/> </button>
                  
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
                <h2 className="mb-5"> <strong>Create a account</strong> </h2>
                <div className="form-group" >
                  <h5>Username <Icon.User/> </h5>
                  <input name="username" type="text" className="form-control" value={this.state.username_handler} onChange={this.handlerInput} />
                </div>
                <div className="form-group" >
                  <h5>Email <Icon.Mail/> </h5>
                  <input name="email" type="email" className="form-control" value={this.state.email_handler} onChange={this.handlerInput}/>
                </div>
                <div className="form-group" >
                  <h5>Password <Icon.Key/> </h5>
                  <input name="password" type="password" className="form-control" value={this.state.password_handler} onChange={this.handlerInput} />
                </div>
                <button id='button_create_account' className="btn btn-primary container" onClick={this.createAccount} >Create Account <Icon.ArrowRightCircle/> </button>
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
