import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CheckList from './CheckList'
import FormT from './FormT'
import { connect } from 'react-redux';
import { fetchCheckList, addNewCheckList, deleteCheckList } from '../actions/boardActions';



class ModalT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkListName: '',
            newCheckListbutton: true,
            closeAddForm: false,
        }
        this.addNewCheckLists = this.addNewCheckLists.bind(this)
        this.deleteCheckList = this.deleteCheckList.bind(this)

    }

    componentDidMount() {
        if (!this.props.checkLists.length) {
            // console.log(this.props.card.id)
            const id = this.props.card.id
            this.props.fetchCheckList(id)
        }

    }

    addNewCheckLists() {
        const NewCheckList = {
            name: this.state.checkListName,
            cardId: this.props.card.id
        };

        this.props.addNewCheckList(NewCheckList);
        // console.log(NewCheckList)
        this.setState({
            checkListName: ''
        })
        this.newCheckListbutton()

    }

    deleteCheckList(event, id) {
        // console.log(id)
        this.props.deleteCheckList(id, this.props.card.id)
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


    render() {
        console.log(this.props.checkLists)
        var checkListData = []
        checkListData = Object.entries(this.props.checkLists).filter(checkList => {
            var keys = Object.keys(checkList[1]);
            var values = Object.values(checkList[1]);
            // console.log(keys)
            // console.log(values)
            if (keys[0] === `checkList-${this.props.card.id}`) {
                // console.log("values = ", values)
                return values[0]
            }
        })
        // console.log(checkListData)
        let data = checkListData.map(elem => Object.values(elem[1])[0])

        var newCheckListbutton = this.state.newCheckListbutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        var allCheckLists = data.map(card => {
            return card.map(checkList => {
                console.log(checkList)
                return (
                    <CheckList
                        key={checkList.id}
                        checkList={checkList}
                        deleteCheckList={this.deleteCheckList}
                        card={this.props.card.id}
                    />
                );
            })
        });
        return (

            <div>
                <Modal dialogClassName="modal-90w" show={this.props.show} onHide={this.props.onHide} >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.card.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card addcard d-flex justify-content-center" style={{ width: '29em' }} >
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
                            add={this.addNewCheckLists}
                            placeholder="Enter Checklist Name"
                            button="Add CheckList"
                        />
                        {allCheckLists}
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    checkLists: state.boards.checkLists
});


export default connect(mapStateToProps, { fetchCheckList, addNewCheckList, deleteCheckList })(ModalT);