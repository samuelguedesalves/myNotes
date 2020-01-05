import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./components/login/App";
import Body from "./components/body/Body";

class RouterApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/dashboard" component={Body} />
                    <Route path="/" component={PageErro} />
                </Switch>
            </Router>
        );
    }
}

class PageErro extends Component{
    constructor(props){
        super(props);

        this.redirectToSurface = this.redirectToSurface.bind(this);
    }

    redirectToSurface () {
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="container" >
                <h1 className="" >Erro 404! <i className="fas fa-user-astronaut"></i> </h1>
                <h3>This page not exist!</h3>
                <button onClick={this.redirectToSurface} className="btn btn-dark"> <i className="fas fa-rocket mr-2"></i> Go to surface</button>
            </div>
        );
    }
}

export default RouterApp;
