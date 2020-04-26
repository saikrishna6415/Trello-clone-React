import React, { Component } from 'react';
import List from './List';
import FormT from './FormT';
import { fetchLists, addNewList, deleteList } from '../actions/boardActions';
import { connect } from 'react-redux';

class Lists extends Component {
    constructor() {
        super()
        this.state = {
            newListButton: true,
            closeAddForm: false,
            listName: ''
        };

        this.addNewList = this.addNewList.bind(this);
        this.deleteList = this.deleteList.bind(this);
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
    
    deleteList(id) {
        this.props.deleteList(id);
    }

    render() {
        // console.log(this.props.lists);
        var newListButton = this.state.newListButton ? 'block' : 'none';
        var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
        var allLists = this.props.lists.map(list => {
            return (
                <List
                    key={list.id}
                    list={list}
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

export default connect(mapStateToProps, { fetchLists, addNewList, deleteList })(Lists);
