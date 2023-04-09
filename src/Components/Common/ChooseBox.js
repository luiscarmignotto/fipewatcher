import React, {useState, useEffect } from 'react';
import './Common.css'

function ChooseBox({itemsList, setOption, displayItem, defaultValue}) {

    const [searchValue, setSearchValue] = useState();

    console.log({displayItem})
    
    useEffect(() => {
        if (!displayItem) {
            setOption(itemsList[0]);
        }
    }, [displayItem]);

    return (
        <div className="ChooseBox">
            <select className="ChooseBox__SelectOption" onChange={e => setOption(itemsList.find((item) => {return item.Value.toString() === e.target.value.toString()}))}>
            {itemsList && itemsList
                .map((item) => (                        
                    <option className="ChooseBox__SelectOption" key={item.Label} value={item.Value}>
                        { item.Label }
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default ChooseBox;