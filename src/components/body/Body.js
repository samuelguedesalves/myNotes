import React, { Component } from 'react';
import axios from "axios";

import Logo from "../../assets/logo_check_task.svg";
import "./Body.css";

//component
import Note from "../note/Note";

class Body extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            user_token: "",
            textEdit: "olá mundo",
            tasks: [],
        }

        this.editNote = this.editNote.bind(this);
    }

    
    componentDidMount(){
        axios.post("https://api-carrot.herokuapp.com/my_task", {
            user_token: localStorage.getItem("check_task_token")
        }).then((api_response) => {
            this.setState({ tasks: api_response.data });
            console.log(api_response.data);
        }).catch((err)=>{
            console.error(err);
        });
    }

    editNote(e){
        console.log(e);

    }

    render() {
        if(localStorage.getItem("check_task_token") != null ){
            return (
                <div className="app_container">
                    
                    {/*modal de text*/}
                    <div className="modal_note">
                        <div className="modal_content">
                            <span className="close_modal"><i className="fas fa-times-circle"></i></span>
                            <h3>Modal Title</h3>
                            <textarea className="text_area_modal" >{this.state.textEdit}</textarea>
                        </div>
                    </div>

                    <div className="middler_container container" >
                        <div className="header_container container">
                            <img className="" width="200px" src={Logo} alt="Check Task" />
                        </div>
                        
                        <div className="task_list" >
                            <h4>Notes</h4>
                            
                            <div className="note_list">
                                <button type="button" className="btn btn-success container mb-3">New Note <i className="fas fa-plus-circle ml-2"></i></button>
                                <div>
                                    {
                                        this.state.tasks.map((item) => { return (<Note edit_note={this.editNote} key={item.task_id} text_note={item.task_note} />)})
                                    }
                                </div>
                                
    
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
