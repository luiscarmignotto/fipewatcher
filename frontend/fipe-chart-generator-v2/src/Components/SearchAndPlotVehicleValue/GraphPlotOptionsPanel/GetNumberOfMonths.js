import React from 'react';
import NumberInputBox from '../../Common/NumberInputBox';

const GetNumberOfMonths = (props) => {
    return (
        <div >
            <div>Insira a quantidade de meses</div>
            <NumberInputBox setValue={props.setNumberOfMonths} />
        </div>
    );
}

export default GetNumberOfMonths;
