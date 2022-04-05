import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./card.styles.css";

class Card extends Component {
    render() {
        const { card, index } = this.props;
        return (
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <div className="card" ref={provided.innerRef} key={card.id} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {card.description}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Card;
