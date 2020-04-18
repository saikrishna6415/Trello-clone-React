import React from 'react';
import { Card, Button } from 'react-bootstrap'
import FormT from './FormT'
import CheckItem from './CheckItem';
// const key = 'ffe39d279ee0a46d632ff7b9e7ac02b5';
// const token = '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'

class CheckList extends React.Component {
    constructor() {
        super()
        this.state = {
            checkItems: [],
            newCheckListiitembutton: true,
            closeAddForm: false,
            checkItemname: '',
            key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
            token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
        }
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
        fetch(
            `https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems?key=${this.state.key}&token=${this.state.token}`,
            {
                method: 'GET'
            }
        )
            .then(data => {
                data.json()
                    .then(data =>
                        this.setState({
                            checkItems: data
                        })
                    );
            }).catch(err => console.log(err))
    }

    addNewCheckItem = () => {
        if (this.state.checkItemName !== '') {
            fetch(
                `https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems?name=${this.state.checkItemName}&pos=bottom&checked=false&key=${this.state.key}&token=${this.state.token}`,
                {
                    method: 'POST'
                }
            )
                .then(data => {
                    data.json()
                        .then(data =>
                            this.setState({
                                checkItems: this.state.checkItems.concat([data]),
                                checkItemName: ''
                            })
                        );
                }).catch(err => console.log(err))
        }
    };
    deleteCheckItem = id => {
        fetch(
            `https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems/${id}?key=${this.state.key}&token=${this.state.token}`,
            {
                method: 'DELETE'
            }
        ).then(() => {
            this.setState({
                checkItems: this.state.checkItems.filter(
                    CheckItem => CheckItem.id !== id
                )
            });
        }).catch(err => console.log(err))
    };
    updateCheckItem = (event, checkItem) => {
        var status = 'incomplete';
        if (event.target.checked === true) {
            status = 'complete';
        }
        // var checkItemStatus = event.target.checked ? 'complete' : 'incomplete';
        fetch(
            `https://api.trello.com/1/cards/${this.props.checkList.idCard}/checkItem/${checkItem.id}?state=${status}&key=${this.state.key}&token=${this.state.token}`,
            {
                method: 'PUT'
            }
        )
            .then(data => {
                data.json()
                    .then(data => {
                        var allItem = this.state.checkItems;
                        allItem[allItem.indexOf(checkItem)].state = data.state;
                        this.setState({
                            checkItems: allItem
                        });
                    });
            }).catch(err => console.log(err))
    };
    render() {
        // console.log(this.props)
        var newCheckListiitembutton = this.state.newCheckListiitembutton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        let checkItems = this.state.checkItems.map(checkItem => (
            <CheckItem
                key={checkItem.id}
                checkItem={checkItem}
                deleteCheckItem={this.deleteCheckItem}
                updateCheckItem={this.updateCheckItem}
                card={this.props.checkList.idCard}
            />
        ));

        return (
            <div>
                <Card style={{ width: '28rem' }}>
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

export default CheckList;
