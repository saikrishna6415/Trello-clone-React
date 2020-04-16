import React, { Component } from 'react';

class CheckItem extends Component {
    render() {
        console.log(this.props)
        return (
            <div className='checkItem d-flex justify-content-between' style ={{margin:"10px" }}>
                <input
                    onChange={(event) =>
                        this.props.updateCheckItem(event,this.props.checkItem)
                    }
                    type='checkBox' style ={{width :"25px",height:"25px"}}
                    className='checkBox'
                    checked={this.props.checkItem.state === 'incomplete' ? false : true}
                    readOnly
                />
                    <p className="checkItemName">{this.props.checkItem.name}</p>
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
