import React, { Component } from 'react';

import Logo from "../../assets/logo_check_task.svg";
import "./Body.css";

//component
import Note from "../note/Note";

class Body extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            user_token: ""
        }
    }

    render() {
        if(localStorage.getItem("check_task_token") != null ){
            return (
                <div className="app_container">
                    <div className="middler_container container" >
                        <div className="header_container container">
                            <img className="" width="200px" src={Logo} alt="Check Task" />
                        </div>
                        
                        <div className="task_list" >
                            <h4>Notes</h4>
                            
                            <div className="note_list">
                                <button type="button" class="btn btn-success container mb-3">New Note <i className="fas fa-plus-circle ml-2"></i></button>

                                <Note text_note="olá mundo" />
    
                            </div>
    
                        </div>
    
                    </div>
                </div>
            );
        }else{
            this.props.history.push("/");
            return(
                <div></div>
            );
        }
    }
}

export default Body;
