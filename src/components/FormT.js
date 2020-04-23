import React from 'react';
import {  Form, Button } from 'react-bootstrap';


function FormT(props) {
    // console.log(props)
    return (
        <div >
            <Form style={{ width: props.width || '29em', display: props.style.display }}
                    className="card addCardForm">
                    <Form.Group style={{marginTop:props.marginTop || '30px'}} >
                        <Form.Control type="text"
                            placeholder={props.placeholder}
                            onChange={props.inputState}
                            value={props.input || ''} required/>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between">
                        <Button style={{ margin: props.marginBot||'9px'  }}
                            onClick={props.add}
                            variant="primary">
                            {props.button}
                     </Button>
                        <Button style={{ margin: props.marginBot||'9px' }}
                            onClick={props.closeAddForm}
                            variant="danger"
                            >
                            X
                         </Button>
                    </Form.Group>
                </Form>
        </div>
    
    )
}

export default FormT;