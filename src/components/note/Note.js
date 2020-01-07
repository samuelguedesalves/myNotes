import React, { Component } from 'react';
import "./Note.css";

class Note extends Component {
    constructor(props){
        super(props);

        this.alterText = this.alterText.bind(this);
    }

    alterText(){
        this.props.edit_note(this.props.index);
    }

    render() {
        return (
            <div onClick={this.alterText} className="card_container">
                <p className="card_text">
                    {this.props.text_note}
                </p>
            </div>
        );
    }
}

export default Note;
