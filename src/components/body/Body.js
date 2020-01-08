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
            textEdit: "",
            selectedNote: null,
            activeModal: false,
            tasks: [],
        }

        this.editNote = this.editNote.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.alterTextEdit = this.alterTextEdit.bind(this);
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

    closeModal(){
        this.setState({ textEdit: ""  ,activeModal: false});
    }

    editNote(index_note){
        this.setState({ textEdit: this.state.tasks[index_note].task_note, selectedNote:index_note, activeModal: true});
    }

    saveNote(e){
        console.log(this.state.textEdit);
        console.log(e.target.value);
    }
    
    alterTextEdit(e){
        this.closeModal = this.closeModal.bind(this);
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

    closeModal(){
        this.setState({ textEdit: ""  ,activeModal: false});
    }

    editNote(index_note){
        this.setState({ textEdit: this.state.tasks[index_note].task_note, selectedNote:index_note, activeModal: true});
    }

    saveNote(e){
        console.log(this.state.textEdit);
        console.log(e.target.value);
        //var indexNote = e.target.value;
        //var indexNote = this.state.tasks[e.target.value];
        //this.setState({ (tasks[e.target.value]) : this.state.textEdit });

        //É NECESSARIO ARRUMAR ESTÁ FUNÇÃO
    }
    
    alterTextEdit(e){
        this.setState({textEdit: e.target.value});
        //console.log(e.target.value);
    }


    render() {
        if(localStorage.getItem("check_task_token") != null ){
            return (
                <div className="app_container">
                    
                    {this.state.activeModal ?
                        <div className="modal_note">
                            <div className="modal_content">
                                <span onClick={this.closeModal} className="close_modal"><i className="fas fa-times-circle"></i></span>
                                <h3>Modal Title</h3>
                                <textarea value={this.state.textEdit} onChange={this.alterTextEdit} className="text_area_modal"/>
                                <button onClick={this.saveNote} value={this.state.selectedNote} type="button" className="btn btn-primary button_save">Save Note</button>
                            </div>
                        </div>
                    :
                        <div></div>
                    }

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
                                        this.state.tasks.map((item, index) => { return (<Note edit_note={this.editNote} key={item.task_id} index={index} text_note={item.task_note} />)})
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
