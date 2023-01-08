import React from 'react';

function ShowBox(props) {

    return (
        <div className="ShowBox">
            {props.itemsList && Object.keys(props.itemsList).map((key) => <div key={key} >{key}: { props.itemsList[key] }</div>)}
        </div>
    )

}

export default ShowBox;