import React from 'react';

function NumberInputBox({setValue}) {

    return (
        <div className="NumberInput" >
            <input className="NumberInput__Box" type="number" onChange={(event) => setValue(event.target.value)}/>
        </div>
    )
}

export default NumberInputBox;