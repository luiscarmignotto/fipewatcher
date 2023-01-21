import React from 'react';

function ShowBox({itemsList}) {

    return (
        <div className="ShowBox">
            {itemsList && Object.keys(itemsList).map((key) => <div key={key} >{key}: { itemsList[key] }</div>)}
        </div>
    )

}

export default ShowBox;