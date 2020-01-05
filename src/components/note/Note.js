import React, { Component } from 'react';
import "./Note.css";

class Note extends Component {
    render() {
        return (
            <div className="card_container">
                <p className="card_text">
                    {this.props.text_note}
                </p>
            </div>
        );
    }
}

export default Note;
