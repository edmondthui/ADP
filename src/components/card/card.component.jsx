import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./card.styles.css";

const Card = ({ card, index }) => {
    return (
        <Draggable draggableId={card.id} index={index} key={card.id}>
            {(provided) => (
                <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {card.description}
                </div>
            )}
        </Draggable>
    );
};

// class Card extends Component {
//     render() {
//         const { card, index } = this.props;
//         return (
//             <Draggable draggableId={card.id} index={index} key={card.id}>
//                 {(provided) => (
//                     <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                         {card.description}
//                     </div>
//                 )}
//             </Draggable>
//         );
//     }
// }

export default Card;
