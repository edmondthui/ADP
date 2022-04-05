import React, { Component } from "react";
import "./card-column.styles.css";
import { Droppable } from "react-beautiful-dnd";
import Card from "../card/card.component";

class CardColumn extends Component {

    render() {
        const { cards, status } = this.props;
        console.log("render")
        return (         
            <Droppable droppableId={status}>
                {(provided) => (
                    <div ref={provided.innerRef} className="card-column" {...provided.droppableProps}>
                        {cards.map((card, index) => {
                            return <Card card={card} index={index} />;
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export default CardColumn;
