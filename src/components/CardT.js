import React from 'react';
import { Card, Button } from 'react-bootstrap'
import ModalT from './ModalT'

class CardT extends React.Component {
    //     console.log(props.cards.id)
    // console.log(props.deleteCard)
    modalRef = ({ handleShow }) => {
        this.showModal = handleShow;
    }

    openModal = () => {
        this.showModal();
    }
    render() {
        // console.log(this.modalRef)

        // console.log(this.props)
        return (
            <div>
                <Card style={{ width: '22rem' }} onClick={() => this.openModal()}>
                    <Card.Body className="d-flex justify-content-between">
                        <Card.Title>{this.props.card.name}</Card.Title>
                        <Button variant="danger"
                            className='deleteButton danger btn btn-xsm'
                            onClick={event => this.props.deleteCard(event, this.props.card.id)}>X</Button>
                    </Card.Body>
                </Card>
                <ModalT ref ={this.modalRef}card ={this.props.card}/>
            </div>
        );
    }
};

export default CardT;
