import React from 'react';
import {  Form, Button } from 'react-bootstrap';


function FormT(props) {
    console.log(props)
    return (
        <div >
            <Form style={{ width: '22rem', display: props.style.display }}
                    className="card addCardForm">
                    <Form.Group controlId="formBasicText" >
                        <Form.Control type="text"
                            placeholder="Enter Card name"
                            onChange={props.inputState}
                            value={props.input} />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between">
                        <Button style={{ margin: '9px' }}
                            onClick={props.addNewCard}
                            variant="primary"
                            type="submit">
                            Add Card
                     </Button>
                        <Button style={{ margin: '9px' }}
                            onClick={props.closeAddForm}
                            variant="danger"
                            type="submit">
                            X
                         </Button>
                    </Form.Group>

                </Form>
        </div>
    
    )
}

export default FormT;