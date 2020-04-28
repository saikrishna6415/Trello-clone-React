import React from 'react';
import { Card, Button } from 'react-bootstrap'
import FormT from './FormT'
import CheckItem from './CheckItem';
import { connect } from 'react-redux';
import { fetchCheckListItems, addCheckItem, deleteCheckItem, updateCheckItemStatus, clearCheckItems } from '../actions/boardActions';


class CheckList extends React.Component {
    constructor() {
        super()
        this.state = {
            newCheckListiitembutton: true,
            closeAddForm: false,
            checkItemname: '',
        }
        this.addNewCheckItem = this.addNewCheckItem.bind(this)
        this.deleteCheckItem = this.deleteCheckItem.bind(this)
        this.updateCheckItem = this.updateCheckItem.bind(this)
    }

    newCheckListiitembutton = () => {
        this.setState(prevState => ({
            newCheckListiitembutton: !prevState.newCheckListiitembutton,
            closeAddForm: !prevState.closeAddForm
        }));
    };
    closeAddForm = () => {
        this.setState(prevState => ({
            newCheckListiitembutton: !prevState.newCheckListiitembutton,
            closeAddForm: !prevState.closeAddForm
        }));
    }
    inputState = event => {
        this.setState({
            checkItemName: event.target.value
        });
    };
    componentDidMount() {
        console.log('mounting checkList component')
        // console.log(this.props.checkList.id)
        const id = this.props.checkList.id
        this.props.fetchCheckListItems(id)
    }

    addNewCheckItem() {
        const checkItem = {
            name: this.state.checkItemName,
            checkListId: this.props.checkList.id
        }

        this.props.addCheckItem(checkItem)
        this.setState({
            checkItemName: ''
        })
        this.newCheckListiitembutton()
    }

    deleteCheckItem(id, checkListId) {
        this.props.deleteCheckItem(id, this.props.checkList.id)

    }
    updateCheckItem(event, checkItem) {

        var status;
        if (event.target.checked === true) {
            status = 'complete';
        } else {
            status = 'incomplete'
        }
        const checkItemsData = {
            checkListId: this.props.checkList.id,
            cardId: this.props.checkList.idCard,
            checkItemId: checkItem.id,
            state: status
        }
        // console.log(checkItemsData)
        this.props.updateCheckItemStatus(checkItemsData)
    };

    componentWillUnmount() {
        console.log('checklist component unmounting')
        this.props.clearCheckItems(this.props.checkList.id)
    }
    render() {
        // console.log(this.props.checkItems)
        var checkItemsData = []
        checkItemsData = Object.entries(this.props.checkItems).filter(checkList => {
            var keys = Object.keys(checkList[1]);
            var values = Object.values(checkList[1]);
            // console.log(keys)
            // console.log(values)
            if (keys[0] === `checkList-${this.props.checkList.id}`) {
                // console.log("values = ", values)
                return values[0]
            }
        })
        // console.log(checkItemsData)
        let data = checkItemsData.map(elem => Object.values(elem[1])[0])
        var newCheckListiitembutton = this.state.newCheckListiitembutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        var checkItems = data.map(checkItem => {
            // card = Array.from(props.data);
            return checkItem.map(checkItemN => {
                // console.log(checkItemN)
                return (
                    <CheckItem
                        key={checkItemN.id}
                        checkItem={checkItemN}
                        deleteCheckItem={this.deleteCheckItem}
                        updateCheckItem={this.updateCheckItem}
                        card={this.props.checkList.idCard}
                    />
                );
            })
        });

        return (
            <div>
                <Card style={{ width: '29rem' }}>
                    <Card.Body className="d-flex justify-content-between">
                        <Card.Title>{this.props.checkList.name}</Card.Title>
                        <Button variant="danger"
                            className='deleteButton danger btn btn-xsm'
                            onClick={event => this.props.deleteCheckList(event, this.props.checkList.id)}>X</Button>
                    </Card.Body>
                    {checkItems}

                    <div className="addcard" style={{ width: '12rem', margin: '0px' }}>
                        <button className="addButton btn-sm btn-primary"
                            onClick={this.newCheckListiitembutton}
                            style={{ margin: '15px', display: newCheckListiitembutton }}>
                            Add  Checklist Items
                        </button>
                    </div>
                    <FormT
                        style={{ display: closeAddForm }}
                        closeAddForm={this.closeAddForm}
                        inputState={this.inputState}
                        input={this.state.checkItemName}
                        add={this.addNewCheckItem}
                        placeholder="Enter ChecklistItem Name"
                        button="Add CheckList Item"
                    // width ="22rem"
                    />
                </Card>
            </div>
        );
    }
};
const mapStateToProps = state => ({
    checkItems: state.boards.checkItems,
});

export default connect(mapStateToProps, {
    fetchCheckListItems,
    addCheckItem,
    deleteCheckItem,
    updateCheckItemStatus,
    clearCheckItems
})(CheckList);
