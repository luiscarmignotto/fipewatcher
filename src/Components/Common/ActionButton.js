import React from 'react';

function ActionButton({onClick, text}) {

    return (
        <button className="ActionButton" onClick={() => onClick()}>{text}</button>
    )
}

export default ActionButton;