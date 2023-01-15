import React, {useState, useEffect } from 'react';
import './Common.css'

function ChooseBox(props) {

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (props.displayItem) {
            setSearchValue(props.displayItem.Label);
        } else {
            setSearchValue("");
        }
    }, [props.displayItem]);

    return (
        <div className="ChooseBox">
            {/* <select className="ChooseBox__SelectOption" value={searchValue} onChange={(e) => {setSearchValue(e.target.value); props.setOption(props.itemsList.find((item) => item.Label === e.target.value))}}> */}
            <select className="ChooseBox__SelectOption" value={searchValue} onChange={(e) => {props.setOption(props.itemsList.find((item) => item.Label === e.target.value))}}>
            <option value="" disabled={true} >Selecione o Tipo de Veículo</option>            
            {props.itemsList && props.itemsList
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