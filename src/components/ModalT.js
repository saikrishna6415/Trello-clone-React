import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CheckList from './CheckList'
import FormT from './FormT'
// const key = 'ffe39d279ee0a46d632ff7b9e7ac02b5';
// const token = '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'

class ModalT extends Component {
    constructor(props) {
        super(props);
        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        this.state = {
            // show: false,
            checkListName: '',
            checkLists: [],
            newCheckListbutton: true,
            closeAddForm: false,
            key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
            token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
        }
        // console.log(props)

    }
    // handleShow() {
    //     // console.log(this.state)
    //     this.setState({ show: !this.state.show })
    // }
    // handleClose() {
    //     this.setState({ show: false })
    // }


    componentDidMount(prevProps) {
        // console.log(this.props.card.id)
        // console.log('modal mounted ')
        if (this.props.card.id) {
            fetch(`https://api.trello.com/1/cards/${this.props.card.id}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${this.state.key}&token=${this.state.token}`, {
                method: 'GET'
            })
                .then(data => {
                    data.json()
                        .then(data =>
                            this.setState({
                                checkLists: data
                            })
                        );
                    console.log('checklists : ',data)

                }).catch(err => console.log(err))
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
            checkListName: event.target.value
        });
    };
    addNewCheckList = () => {
        // console.log(this.state.checkListName)
        if (this.state.checkListName !== '') {
            fetch(
                `https://api.trello.com/1/cards/${this.props.card.id}/checkLists?name=${this.state.checkListName}&key=${this.state.key}&token=${this.state.token}`,
                {
                    method: 'POST'
                }
            )
                .then(data => {
                    data.json()
                        .then(data => {
                            console.log(data);
                            this.setState({
                                checkLists: this.state.checkLists.concat([data]),
                                checkListName: ''
                            });
                        });
                }).catch(err => console.log(err))
        }
    };
    deleteCheckList = (event, id) => {
        fetch(
            `https://api.trello.com/1/checkLists/${id}?key=${this.state.key}&token=${this.state.token}`,
            {
                method: 'DELETE'
            }
        ).then(() => {
            this.setState({
                checkLists: this.state.checkLists.filter(
                    checkList => checkList.id !== id
                )
            });
        }).catch(err => console.log(err))
    };


    render() {

        var newCheckListbutton = this.state.newCheckListbutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        let checkLists = this.state.checkLists.map(checkList => (
            <CheckList
                key={checkList.id}
                checkList={checkList}
                deleteCheckList={this.deleteCheckList}
                card={this.props.card.id}
            />
        ));

        return (

            <div>
                <Modal dialogClassName="modal-90w" show={this.props.show} onHide={this.props.onHide} >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.card.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ overflow: "scroll" }}>
                        <div className="card addcard d-flex justify-content-center" >
                            <button className="addButton btn btn-primary m-1 w-5"
                                onClick={this.newCheckListbutton}
                                style={{ display: newCheckListbutton }}>
                                Add New Checklist
                        </button>
                        </div>
                        <FormT
                            style={{ display: closeAddForm }}
                            closeAddForm={this.closeAddForm}
                            inputState={this.inputState}
                            input={this.state.checkListName}
                            add={this.addNewCheckList}
                            placeholder="Enter Checklist Name"
                            button="Add CheckList"
                        />
                        {checkLists}
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}
export default ModalT;