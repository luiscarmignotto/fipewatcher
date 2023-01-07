import React from 'react';

function ShowBox(props) {

    console.log("showboxItemsList", props.itemsList)

    return (
        <div>
            {props.itemsList && Object.keys(props.itemsList).map((key) => <div key={key} >{key}: { props.itemsList[key] }</div>)}
        </div>
    )

}

export default ShowBox;