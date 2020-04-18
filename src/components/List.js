import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import CardT from './CardT'
import FormT from './FormT';

// const key = 'ffe39d279ee0a46d632ff7b9e7ac02b5';
// const token = '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
// const boardId = '5e85acba78a12f3e5a028ba7';
// const listId = '5e85ad2f4e862e4caf13bc81';

class List extends Component {
    constructor() {
        super()
        this.state = {
            cards: [],
            cardName: '',
            newCardbutton: true,
            closeAddForm: false,
            key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
            token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
        }
    }
    componentDidMount() {
        fetch(`https://api.trello.com/1/lists/${this.props.lists.id}/cards?key=${this.state.key}&token=${this.state.token}`, {
            method: 'GET'
        })
            .then(data => {
                data.json()
                    .then(data => {
                        // console.log(data);
                        this.setState({
                            cards: data
                        });
                    })
            })
            .catch(err => console.log(err))
    }
    newCardbutton = () => {
        this.setState(prevState => ({
            newCardbutton: !prevState.newCardbutton,
            closeAddForm: !prevState.closeAddForm
        }));
    };
    closeAddForm = () => {
        this.setState(prevState => ({
            newCardbutton: !prevState.newCardbutton,
            closeAddForm: !prevState.closeAddForm
        }));
    }
    inputState = event => {
        this.setState({
            cardName: event.target.value
        });
    };
    addNewCard = () => {
        if (this.state.cardName !== '') {
            fetch(`https://api.trello.com/1/cards?idList=${this.props.lists.id}&name=${this.state.cardName}&keepFromSource=all&key=${this.state.key}&token=${this.state.token}`, {
                method: 'POST'
            })
                .then(data => {
                    data.json()
                        .then(data => {
                            this.setState({
                                cards: this.state.cards.concat([data]),
                                cardName: ''
                            });
                        });
                }).catch(err => console.log(err))
        }
    };

    deleteCard = (event, id) => {
        event.stopPropagation();
        fetch(`https://api.trello.com/1/cards/${id}?key=${this.state.key}&token=${this.state.token}`, {
            method: 'DELETE'
        }).then(() => {
            this.setState({ cards: this.state.cards.filter(card => card.id !== id) });
        })
            .catch(err => console.log(err))
    };



    render() {
        var newCardbutton = this.state.newCardbutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        var allCards = this.state.cards.map(card => {
            // console.log(card)
            return (
                <CardT key={card.id}
                    card={card}
                    deleteCard={this.deleteCard}
                    onClick={this.props.showModal}
                />
            );
        });
        return (
            <div className="list" style={{ margin: "5px" }}>
                <Card style={{ width: '22rem' }}>
                    <div className="d-flex justify-content-between" style={{ margin: "5px", padding: "10px" }}>
                        <Card.Title>{this.props.lists.name}</Card.Title>
                        <button
                            onClick={() => this.props.deleteList(this.props.lists.id)}
                            className='btn-default deleteButtonForList'>
                            X
                        </button>
                    </div>
                </Card>

                <div className="card addcard" style={{ width: '22rem' }}>
                    <button className="addButton btn btn-primary"
                        onClick={this.newCardbutton}
                        style={{ margin: '15px', display: newCardbutton }}>
                        Add New Card
                        </button>
                </div>
                {allCards}
                <FormT
                    style={{ display: closeAddForm }}
                    closeAddForm={this.closeAddForm}
                    inputState={this.inputState}
                    input={this.state.cardName}
                    add={this.addNewCard}
                    placeholder="Enter Card Name"
                    button="Add Card"
                    width='22rem'
                />

            </div>
        )
    }
}

export default List;
