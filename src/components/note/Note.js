import React, { Component } from 'react';
import "./Note.css";

class Note extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: this.props.text_note
        }
    }

    render() {
        return (
            <div onClick={this.props.edit_note} className="card_container">
                <p className="card_text">
                    {this.state.text}
                </p>
            </div>
        );
    }
}

export default Note;
