import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCheckItemName } from '../actions/boardActions';

class CheckItem extends Component {
    state = {
        checkItemName: this.props.checkItem.name,
        updatingCheckItem: false,
        // checked: true
    };
    handleForm = () => {
        const checkItemData = {
            card: this.props.card,
            checkItemId: this.props.checkItem.id,
            checkItemName: this.state.checkItemName

        }
        this.props.updateCheckItemName(checkItemData)

        this.setState({ updatingCheckItem: false });

    };

    handleUpdate = () => {
        this.setState({
            updatingCheckItem: false
        })
    }

    inputState = (e) => {
        this.setState({ checkItemName: e.target.value });
    };

    handleUpdateCheckItem = () => {
        this.setState({ updatingCheckItem: true });
    };

    render() {
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

                />
                <div
                    style={{ width: "91%", marginTop: '12px' }}
                    onClick={this.handleUpdateCheckItem}>
                    {this.state.updatingCheckItem ? (
                        <input type="text" style={{ width: "15em" }}
                            className="form-control"
                            onChange={this.inputState}
                            value={this.state.checkItemName}
                        />
                    ) : (this.props.checkItem.state === "complete" ? (
                        <p
                            style={{ textDecoration: "line-through" }}>
                            {this.state.checkItemName}
                        </p>
                    ) : (
                            <p>   {this.state.checkItemName}</p>
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
const mapStateToProps = state => ({
    checkItems: state.boards.checkItems,
});


export default connect(mapStateToProps, { updateCheckItemName })(CheckItem);
