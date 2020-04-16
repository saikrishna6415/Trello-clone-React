import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const key = 'ffe39d279ee0a46d632ff7b9e7ac02b5';
const token = '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'



class Modal extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            checkListNames: [],
            checkListNameName: '',
            newcheckListNamebutton: true,
            closeAddForm: false

        }
    }
    newcheckListNamebutton = () => {
        this.setState(prevState => ({
            newcheckListNamebutton: !prevState.newcheckListNamebutton,
            closeAddForm: !prevState.closeAddForm
        }));
    };
    closeAddForm = () => {
        this.setState(prevState => ({
            newcheckListNamebutton: !prevState.newcheckListNamebutton,
            closeAddForm: !prevState.closeAddForm
        }));
    }
    inputState = event => {
        this.setState({
            checkListNameName: event.target.value
        });
    };

    handleShow = (event) => {
        this.setState({
            showModal: true
        })
    }
    handleClose = (event) => {
        this.setState({
            showModal: false
        })
    }


    render() {
        // var newcheckListNamebutton = this.state.newcheckListNamebutton ? 'block' : 'none';
        // var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        // var allChecklists = this.state.checkListNames.map(checkListName => {
        //     console.log(checkListName)
        //     return (
        //         <checkListNameT key={checkListName.id}
        //             checkListNames={checkListName}
        //             deletecheckListName={this.deletecheckListName}
        //         />
        //     );
        // });

        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
      </Button>
                <Modal show={this.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Modal;
