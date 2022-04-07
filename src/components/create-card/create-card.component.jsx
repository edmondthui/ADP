import React, { Component } from "react";
import "./create-card.styles.css";
import {connectToKanbanDB} from "../../utils/kanban.utils.js"


class CreateCard extends Component {

    constructor() {
        super();
        this.state = {
            create: ''
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.currentTarget.value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.create.length) {
            let card = {name: this.state.create, description: this.state.create, status: "TODO"}
            connectToKanbanDB().then((db, dbInstanceId) => {
                db.addCard(card).then((cardId) => console.log(`successfully added card ${cardId}`));
                db.getCards().then((cards) => console.log(cards));
            });
            this.setState({create : ''});
            this.props.updateCards();
        }
    };

    render() {
        const { handleSubmit, update} = this;
        return (
            <div className="create-card">
                <form onSubmit={handleSubmit} className="create-card-form">
                    <input onChange = {update("create")} value={this.state.create} placeholder="e.g. Bug: TextPoll not dispatching half stars" />
                    <button>ADD NEW</button>
                </form>
            </div>
        );
    }
}

export default CreateCard;
