import React from 'react';
import { Card, Button } from 'react-bootstrap'
const CardT = props => {
//     console.log(props.cards.id)
// console.log(props.deleteCard)
    return (
        <div>
            <Card style={{ width: '22rem' }}>
                <Card.Body className="d-flex justify-content-between">
                    <Card.Title>{props.cards.name}</Card.Title>
                    <Button variant="danger" 
                    className='deleteButton danger btn btn-xsm' 
                    onClick={event => props.deleteCard(event, props.cards.id)}>X</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CardT;
