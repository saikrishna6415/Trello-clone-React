import React, { Component } from 'react';
import List from './List';
import FormT from './FormT';

class Lists extends Component {
    state = {
        lists: [],
        newListButton: true,
        closeAddForm: false,
        listName: '',
        key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
        token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
    };
    newListButton = () => {
        this.setState(prevState => ({
            newListButton: !prevState.newListButton,
            closeAddForm: !prevState.closeAddForm
        }));
    };
    closeAddForm = () => {
        this.setState(prevState => ({
            newListButton: !prevState.newListButton,
            closeAddForm: !prevState.closeAddForm
        }));
    }
    inputState = event => {
        this.setState({
            listName: event.target.value
        });
    };
    componentDidMount() {
        //console.log('helee');
        fetch(`https://api.trello.com/1/boards/${this.props.match.params.id}/lists?key=${this.state.key}&token=${this.state.token}`, {
            method: 'GET'
        })
            .then(data => {
                data.json()
                    .then(data => {
                        // console.log(data);
                        this.setState({
                            lists: data
                        });
                    });
            }).catch(err => console.log(err))
    }

    addNewList = () => {
        fetch(`https://api.trello.com/1/lists?name=${this.state.listName}&idBoard=${this.props.match.params.id}&pos=bottom&key=${this.state.key}&token=${this.state.token}`, {
            method: 'POST'
        })
            .then(data => {
                data.json()
                    .then(data => {
                        this.setState({
                            lists: this.state.lists.concat([data]),
                            listName: ''
                        });
                    });
            }).catch(err => console.log(err))
    };

    deleteList = id => {
        fetch(
            `https://api.trello.com/1/lists/${id}/closed?value=true&key=${this.state.key}&token=${this.state.token}`,
            {
                method: 'PUT'
            }
        ).then(() => {
            this.setState({ lists: this.state.lists.filter(list => list.id !== id) });
        }).catch(err => console.log(err))
    };
    render() {
        //console.log(this.state.checkLists);
        var newListButton = this.state.newListButton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        var allLists = this.state.lists.map(list => {
            return (
                <List
                    key={list.id}
                    lists={list}
                    deleteList={this.deleteList}
                />
            );
        });
        return (
            <div>
                <div className="list d-flex justify-content-start">
                    {allLists}
                    <div className="card addList">
                        <button className="addListButton btn btn-primary"
                            onClick={this.newListButton}
                            style={{ display: newListButton }}>
                            Add List
                        </button>
                        <FormT
                            style={{ display: closeAddForm }}
                            closeAddForm={this.closeAddForm}
                            inputState={this.inputState}
                            input={this.state.listName}
                            add={this.addNewList}
                            placeholder="Enter List Name"
                            button="Add List"
                            width='22rem'
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default Lists;
