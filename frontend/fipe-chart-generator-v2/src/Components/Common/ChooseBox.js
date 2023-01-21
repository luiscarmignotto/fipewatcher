import React, {useState, useEffect } from 'react';
import './Common.css'

function ChooseBox({itemsList, setOption, displayItem}) {

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (displayItem) {
            setSearchValue(displayItem.Label);
        } else {
            setSearchValue("");
        }
    }, [displayItem]);

    return (
        <div className="ChooseBox">
            {/* <select className="ChooseBox__SelectOption" value={searchValue} onChange={(e) => {setSearchValue(e.target.value); setOption(itemsList.find((item) => item.Label === e.target.value))}}> */}
            <select className="ChooseBox__SelectOption" value={searchValue} onChange={(e) => {setOption(itemsList.find((item) => item.Label === e.target.value))}}>
            <option value="" disabled={true} >Selecione o Tipo de Veículo</option>            
            {itemsList && itemsList
                .map((item) => (                        
                    <option className="ChooseBox__SelectOption" key={item.Label} onClick={() => { setSearchValue(item.Label)}}>
                        { item.Label }
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default ChooseBox;