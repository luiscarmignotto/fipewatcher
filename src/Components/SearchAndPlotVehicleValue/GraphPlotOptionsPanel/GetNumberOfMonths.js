import React from 'react';
import NumberInputBox from '../../Common/NumberInputBox';

const GetNumberOfMonths = ({setNumberOfMonths}) => {
    return (
        <div >
            <div>Insira a quantidade de meses</div>
            <NumberInputBox setValue={setNumberOfMonths} />
        </div>
    );
}

export default GetNumberOfMonths;
