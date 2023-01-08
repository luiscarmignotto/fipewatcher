import React from 'react';

function NumberInputBox(props) {

    return (
        <div className="NumberInput" >
            <input className="NumberInput__Box" type="number" onChange={(event) => props.setValue(event.target.value)}/>
        </div>
    )
}

export default NumberInputBox;