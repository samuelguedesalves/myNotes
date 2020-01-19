import React, { Component } from 'react';
import api from "../../services/api";
import Logo from "../../assets/MyNotes_logo.svg";
import * as Icon from 'react-feather';
import getToken from '../../util/getToken';
import "./Body.css";
import Note from "../note/Note";


class Body extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            user_token: "",
            textEdit: "",
            selectedNote: null,
            activeModal: false,
            notes: [],
        }

        this.editNote = this.editNote.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.alterTextEdit = this.alterTextEdit.bind(this);
        this.newNote = this.newNote.bind(this);
    }

    
    async componentDidMount(){
        const token = getToken();
        const response = await api.get('/app/list', {
            headers: {
                'Authorization' : token ,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
        });

        if(!response){
            console.log('erro in fetch');
        }else{
            this.setState({ notes: response.data.notes });
            console.log(response.data.notes);
        }
    }

    closeModal(){
        this.setState({ textEdit: ""  ,activeModal: false});
    }

    editNote(index_note){
        this.setState({ textEdit: this.state.notes[index_note].text, selectedNote:index_note, activeModal: true});
    }

    saveNote(e){
        console.log(this.state.textEdit);
        console.log(e.target.value);
        //var indexNote = e.target.value;
        //var indexNote = this.state.tasks[e.target.value];
        //this.setState({ (tasks[e.target.value]) : this.state.textEdit });
        
        //É NECESSARIO ARRUMAR ESTÁ FUNÇÃO
        //this.setState({ tasks: [...this.state.tasks[e.target.value], this.state.textEdit] });
        var newArray = this.state.tasks.filter(task => task!==this.state.tasks[e.target.value] );
        console.log(newArray);

        var newNote = {id_task: this.state.tasks[e.target.value].task_id, task_note: this.state.textEdit}

        this.setState({tasks: newArray.concat(newNote), activeModal: false, textEdit: ""});
        console.log(this.state.tasks);
    }
    
    alterTextEdit(e){
        this.setState({textEdit: e.target.value});
    }

    newNote(){
        this.setState({ activeModal: true });
    }

    async saveNewNote(){
        const token = getToken();
        const response = await api.post('/app/create', {
            headers:{
                "Authorization": token
            }
        });
        if(!response){
            
        }
    }

    render() {
        if(localStorage.getItem("token") != null ){
            return (
                <div className="app_container">
                    
                    {this.state.activeModal ?
                        <div className="modal_note">
                            <div className="modal_content">
                                <span onClick={this.closeModal} id='spanCloseModal' className="close_modal"> <Icon.XCircle size={28} color='#FD7468' /> </span>
                                <h3>Note</h3>
                                <textarea value={this.state.textEdit} onChange={this.alterTextEdit} className="text_area_modal"/>
                                <button onClick={this.saveNote} value={this.state.selectedNote} type="button" className="btn btn-primary button_save">Save Note <Icon.Save/> </button>
                            </div>
                        </div>
                    :
                        <div></div>
                    }

                    <div className="middler_container container" >
                        <div className="header_container container">
                            <img className="" width="180px" src={Logo} alt="Check Task" />
                        </div>
                        
                        <div className="task_list" >
                            <h4>Notes</h4>
                            
                            <div className="note_list">
                                <button type="button" id='buttonNewNote' className="btn btn-success container mb-3" onClick={this.newNote} >New Note <Icon.PlusCircle/> </button>
                                <div>
                                    {
                                        this.state.notes.map( (note, index) => { return (<Note edit_note={this.editNote} key={note._id} index={index} text_note={note.text} />)})
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
