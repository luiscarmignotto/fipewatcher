import React from 'react';

function NumberInputBox(props) {

    return (
        <div>
            <input className="NumberInputBox" type="number" onChange={(event) => props.setValue(event.target.value)}/>
        </div>
    )
}

export default NumberInputBox;