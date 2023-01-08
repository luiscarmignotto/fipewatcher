import React from 'react';

function ActionButton(props) {

    return (
        <button className="ActionButton" onClick={() => props.onClick()}>{props.text}</button>
    )
}

export default ActionButton;