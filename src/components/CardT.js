import React from 'react';
import { Card, Button } from 'react-bootstrap'
import ModalT from './ModalT'

class CardT extends React.Component {
    //     console.log(props.cards.id)
    // console.log(props.deleteCard)
    // modalRef = ({ handleShow }) => {
    //     this.showModal = handleShow;
    // }

    // openModal = () => {
    //     this.showModal();
    // }
    constructor() {
        super()
        this.wrapper = React.createRef();
        this.state = {
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleShow() {
        // console.log(this.state)
        this.setState({ show: !this.state.show })
    }
    handleClose() {
        this.setState({ show: false })
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <Card style={{ width: '22rem' }} onClick={this.handleShow}>
                    <Card.Body className="d-flex justify-content-between">
                        <Card.Title>{this.props.card.name}</Card.Title>
                        <Button variant="danger"
                            className='deleteButton danger btn btn-xsm'
                            onClick={event => this.props.deleteCard(event, this.props.card.id)}>X</Button>
                    </Card.Body>
                </Card>
                {/* <ModalT ref={this.modalRef} card={this.props.card} /> */}
                <ModalT  ref={this.wrapper}show={this.state.show} card={this.props.card} onHide={this.handleClose}>{this.props.children}</ModalT> 

            </div>
        );
    }
};

export default CardT;
