import React, { Component } from "react";
import "./App.css";
import CardColumn from "./components/card-column/card-column.component.jsx";
import CreateCard from "./components/create-card/create-card.component.jsx";
import { connectToKanbanDB } from "./utils/kanban.utils";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
    // Initialize DB communications.

    constructor() {
        super();
        this.state = {
            TODO: [],
			IN_PROGRESS: [],
			DONE: []
        };

        this.updateCards = this.updateCards.bind(this);
    }

    componentDidMount() {
        this.updateCards();
    }

    updateCards = async () => {
        connectToKanbanDB().then((db, dbInstanceId) => {
			db.getCardsByStatusCodes(['TODO']).then(cards => {
				this.setState(() => {
					return { TODO: cards };
				})
			})
			db.getCardsByStatusCodes(["IN_PROGRESS"]).then((cards) => {
				this.setState(() => {
					return { IN_PROGRESS: cards };
				});
			});
			db.getCardsByStatusCodes(["DONE"]).then((cards) => {
				this.setState(() => {
					return { DONE: cards };
				});
			});
        });
    };

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        console.log(result);

        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

		const column = source.droppableId;
        const newCards = Array.from(this.state[column]);
		
		if (destination.droppableId === source.droppableId) {
			const card = newCards.splice(source.index, 1);
			// Database does not keep track of index so it just updates this on the front end
			newCards.splice(destination.index, 0, ...card);
			this.setState(() => {
				return { [destination.droppableId] : newCards}
			})
		}

		if (destination.droppableId !== source.droppableId) {
			const card = newCards[source.index];
			card.status = destination.droppableId;
			newCards.splice(source.index, 1);
			const destinationCards = Array.from(this.state[destination.droppableId]);
			destinationCards.splice(destination.index, 0, card);
			console.log(destinationCards);
			this.setState(() => {
				return { 
					[destination.droppableId]: destinationCards,
					[source.droppableId]: newCards
				};
			})
			connectToKanbanDB().then((db, dbInstanceId) => {
				db.updateCardById(card.id, {status: destination.droppableId})
			})
		}
    };

    render() {
        const { TODO, IN_PROGRESS, DONE } = this.state;
        return (
            <div className="App row">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="column-container col">
                        <h1>To-do</h1>
                        <CardColumn cards={TODO} status="TODO" />
                    </div>
                    <div className="column-container col">
                        <h1>In Progress</h1>
                        <CardColumn cards={IN_PROGRESS} status="IN_PROGRESS" />
                    </div>
                    <div className="column-container col">
                        <h1>Done</h1>
                        <CardColumn cards={DONE} status="DONE" />
                    </div>
                    <CreateCard updateCards={this.updateCards} />
                </DragDropContext>
            </div>
        );
    }
}

export default App;
