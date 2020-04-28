import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import CardT from './CardT'
import FormT from './FormT';
import { connect } from 'react-redux';
import { fetchCards, addNewCard, deleteCard, clearCards } from '../actions/boardActions';


class List extends Component {
    constructor() {
        super()
        this.state = {
            cardName: '',
            newCardbutton: true,
            closeAddForm: false,
            hasError: false
        }
        this.addNewCard = this.addNewCard.bind(this)
        this.deleteCard = this.deleteCard.bind(this)

    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }
    componentDidMount() {
        console.log('mounting list component')
        // console.log(this.props.list)
        const id = this.props.list.id;
        this.props.fetchCards(id)
    }


    addNewCard() {
        const newCard = {
            name: this.state.cardName,
            listId: this.props.list.id
        };

        this.props.addNewCard(newCard);
        // console.log(newCard)
        this.setState({
            cardName: ''
        })
        this.newCardbutton()
    }
    deleteCard(event, id, idList) {
        event.stopPropagation()
        this.props.deleteCard(id, idList);
        // console.log(id)
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
    componentWillUnmount() {
        console.log('unmounting list component')
        const id = this.props.list.id;
        this.props.clearCards(id);
    }
    render() {
        // console.log(this.props.cards)
        var cardsData = []
        cardsData = Object.entries(this.props.cards).filter(card => {
            var keys = Object.keys(card[1]);
            var values = Object.values(card[1]);
            // console.log(keys)
            // console.log(values)
            if (keys[0] === `card-${this.props.list.id}`) {
                // console.log("values = ", values)
                return values[0]
            }
        })
        // console.log(cardsData)
        let data = cardsData.map(elem => Object.values(elem[1])[0])
        // console.log('cardData1 = ', data)


        var newCardbutton = this.state.newCardbutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        // var allcardsData;
        var allCards = data.map(card => {
            // card = Array.from(props.data);
            return card.map(cardnew => {
                return (
                    <CardT key={cardnew.id}
                        card={cardnew}
                        name={cardnew.name}
                        deleteCard={this.deleteCard}
                    // onClick={this.props.showModal}
                    />
                );
            })
        });
        // var allcardsData = { cards: this.props.cards }
        // console.log(allcardsData)
        return (
            <div className="list" style={{ margin: "5px" }}>
                <div className="lists">
                    <Card style={{ width: '22rem' }} >
                        <div className="d-flex justify-content-between" style={{ height: "70px", padding: "9px", backgroundColor: 'rgb(226, 225, 227)' }}>
                            <Card.Title>{this.props.list.name}</Card.Title>
                            <button
                                onClick={() => this.props.deleteList(this.props.list.id)}
                                className='btn-default deleteButtonForList' style={{ height: "30px" }}>
                                X
                        </button>

                        </div>
                    </Card>
                    <div className="allcards">
                        {allCards}

                    </div>


                    <div className="card addcard" style={{ width: '22rem' }}>
                        <button className="addButton btn btn-primary"
                            onClick={this.newCardbutton}
                            style={{ margin: '15px', display: newCardbutton }}>
                            Add Another Card
                        </button>
                    </div>
                    <FormT
                        style={{ display: closeAddForm, margin: '0px' }}
                        closeAddForm={this.closeAddForm}
                        inputState={this.inputState}
                        input={this.state.cardName}
                        add={this.addNewCard}
                        placeholder="Enter Card Name"
                        button="Add Card"
                        width='22rem'
                        marginTop='10px'
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cards: state.boards.cards,
});


export default connect(mapStateToProps, { fetchCards, addNewCard, deleteCard, clearCards })(List);
