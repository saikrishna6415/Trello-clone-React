import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CheckList from './CheckList'
import FormT from './FormT'
const key = 'ffe39d279ee0a46d632ff7b9e7ac02b5';
const token = '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'

class ModalT extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            cardId: '',
            checkLists: [],
            newCheckListbutton: true,
            closeAddForm: false,

        }
        // console.log(props)

    }
    handleShow() {
        console.log(this.state)
        this.setState({ show: true })
    }
    handleClose() {
        this.setState({ show: false })
    }


    componentDidMount(prevProps) {
        console.log(this.props.card.id)
        if (this.props.card.id) {
            fetch(
                `https://api.trello.com/1/cards/${this.props.card.id}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${key}&token=${token}`,

                {
                    method: 'GET'
                }
            )
                .then(data => data.json())
                .then(data =>
                    this.setState({
                        checkLists: data
                    })
                );
        }
    }
    newCheckListbutton = () => {
        this.setState(prevState => ({
            newCheckListbutton: !prevState.newCheckListbutton,
            closeAddForm: !prevState.closeAddForm
        }));
    };
    closeAddForm = () => {
        this.setState(prevState => ({
            newCheckListbutton: !prevState.newCheckListbutton,
            closeAddForm: !prevState.closeAddForm
        }));
    }
    inputState = event => {
        this.setState({
            inputValue: event.target.value
        });
    };
    addNewCheckList = () => {
        console.log(this.state.inputValue)
        fetch(
            `https://api.trello.com/1/cards/${this.props.card.id}/checkLists?name=${this.state.inputValue}&key=${key}&token=${token}`,
            {
                method: 'POST'
            }
        )
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({
                    checkLists: this.state.checkLists.concat([data]),
                    inputValue: ''
                });
            });
    };
    deleteCheckList =(event, id) => {
        fetch(
            `https://api.trello.com/1/checkLists/${id}?key=${key}&token=${token}`,
            {
                method: 'DELETE'
            }
        ).then(() => {
            this.setState({
                checkLists: this.state.checkLists.filter(
                    checkList => checkList.id !== id
                )
            });
        });
    };


    render() {

        var newCheckListbutton = this.state.newCheckListbutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        let checkLists = this.state.checkLists.map(checkList => (
            <CheckList
                key={checkList.id}
                checkList={checkList}
                deleteCheckList={this.deleteCheckList}
            />
        ));

        return (

            <div>
                <Modal show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.card.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{overflow :"scroll"}}>
                        <div className="card addcard" style={{ width: '22rem' }}>
                            <button className="addButton btn btn-primary"
                                onClick={this.newCheckListbutton}
                                style={{ margin: '15px', display: newCheckListbutton }}>
                                Add New Checklist
                        </button>
                        </div>
                        <FormT
                            style={{ display: closeAddForm}}
                            closeAddForm={this.closeAddForm}
                            inputState={this.inputState}
                            input={this.state.inputValue}
                            add={this.addNewCheckList}
                            placeholder ="Enter Checklist Name"
                            button ="Add CheckList"
                        />
                        {checkLists}
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}
export default ModalT;