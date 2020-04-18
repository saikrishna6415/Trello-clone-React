import React, { Component } from 'react';

class CheckItem extends Component {
    state = {
        input: this.props.checkItem.name,
        updatingCheckItem: false,
        key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
        token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'

    };
    handleForm = () => {
        fetch(`https://api.trello.com/1/cards/${this.props.card}/checkItem/${this.props.checkItem.id}?key=${this.state.key}&token=${this.state.token}&name=${this.state.input}`, {
            method: "PUT",
        })
            .then(() => {
                this.setState({ updatingCheckItem: false });

            }).catch(err => console.log(err))
    };

    handleUpdate = () => {
        this.setState({
            updatingCheckItem: false
        })
    }

    inputState = (e) => {
        this.setState({ input: e.target.value });
    };

    handleUpdateCheckItem = () => {
        this.setState({ updatingCheckItem: true });
    };


    render() {
        // console.log(this.props)
        // console.log(this.props.checkItem.state)
        // console.log(this.state.updatingCheckItem)
        var updateButton = this.state.updatingCheckItem ? 'block' : 'none'
        return (
            <div className='checkItem d-flex justify-content-between'>
                <input
                    onChange={(event) =>
                        this.props.updateCheckItem(event, this.props.checkItem)
                    }
                    type='checkBox'
                    className='checkBox'
                    checked={this.props.checkItem.state === 'incomplete' ? false : true}
                    readOnly
                />
                <div
                    style={{ width: "91%", marginTop: '12px' }}
                    onClick={this.handleUpdateCheckItem}>
                    {this.state.updatingCheckItem ? (
                        <input type="text" style={{ width: "15em" }}
                            className="form-control"
                            onChange={this.inputState}
                            value={this.state.input}
                        />
                    ) : (this.props.checkItem.state === "complete" ? (
                        <p
                            style={{ textDecoration: "line-through" }}>
                            {this.state.input}
                        </p>
                    ) : (
                            <p>   {this.state.input}</p>
                        ))}
                </div>
                <button className="btn btn-primary" style={{ display: updateButton }} onClick={this.handleForm}>update</button>
                <button
                    onClick={() => this.props.deleteCheckItem(this.props.checkItem.id)}
                    className='btn btn-danger deleteButtonForItem'>
                    x
                </button>
            </div>
        );
    }
}

export default CheckItem;
