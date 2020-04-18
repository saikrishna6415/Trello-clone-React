import React, { Component } from 'react';

class CheckItem extends Component {
    render() {
        // console.log(this.props)
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
                {this.props.checkItem.state === 'incomplete' ?
                    <p className="checkItemName">{this.props.checkItem.name} </p>
                    : <p className="checkItemName" style={{ textDecoration: "line-through" }}>{this.props.checkItem.name}
                    </p>}

                <button
                    onClick={() => this.props.deleteCheckItem(this.props.checkItem.id)}
                    className='deleteButtonForItem'>
                    x
        </button>
            </div>
        );
    }
}

export default CheckItem;
