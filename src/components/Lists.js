import React, { Component } from 'react';
import List from './List';
import FormT from './FormT';
import { fetchLists, addNewList } from '../actions/boardActions';
import { connect } from 'react-redux';

class Lists extends Component {
    constructor() {
        super()
        this.state = {
            // lists: [],
            newListButton: true,
            closeAddForm: false,
            listName: '',
            // id: this.props.match.params.id
            // key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
            // token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
        };

        this.addNewList = this.addNewList.bind(this);

    }



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
        const id = this.props.match.params.id;
        this.props.fetchLists(id);
    }
    addNewList() {
        const newList = {
            name: this.state.listName,
            boardid: this.props.match.params.id
        };
        // console.log('listName :', this.state.listName)
        this.props.addNewList(newList);
        this.setState({
            listName: ''
        })
    }

    render() {
        //console.log(this.state.checkLists);
        var newListButton = this.state.newListButton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        var allLists = this.props.lists.map(list => {
            return (
                <List
                    key={list.id}
                    lists={list}
                    deleteList={this.deleteList}
                />
            );
        });
        return (
            <div className="allLists">
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

const mapStateToProps = state => ({
    lists: state.boards.lists,
    list: state.boards.list
});

export default connect(mapStateToProps, { fetchLists, addNewList })(Lists);
