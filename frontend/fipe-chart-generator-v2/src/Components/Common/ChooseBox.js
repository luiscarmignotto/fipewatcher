import React, {useState} from 'react';
import './Common.css'

function ChooseBox(props) {

    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="ChooseBox">
            <select className="ChooseBoxSelectOption" value={searchValue} onChange={(e) => {setSearchValue(e.target.value); props.setOption(props.itemsList.find((item) => item.Label === e.target.value))}}>
            <option value="" disabled={true} >Selecione o Tipo de Veículo</option>
            {props.itemsList && props.itemsList
                .map((item) => (                        
                    <option className="ChooseBoxSelectOption" key={item.Label} onClick={() => { setSearchValue(item.Label)}}>
                        { item.Label }
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default ChooseBox;