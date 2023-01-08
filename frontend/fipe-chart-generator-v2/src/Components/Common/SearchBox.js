import React, {useState} from 'react';
import './Common.css'

function SearchBox(props) {

    const [searchValue, setSearchValue] = useState("");

    function searchFilter(value) {

        console.log("searchValue: ", searchValue)

        const searchTerm = searchValue.toLowerCase();
        const fullName = value.toLowerCase();


        return (
            searchTerm &&
            fullName.includes(searchTerm) &&
            fullName !== searchTerm 
        )       


    }

    function displayOptions(itemsList){
        
        const filterIncludeOptions = itemsList.filter((item) => searchFilter(item.Label)).sort().splice(0,9);

        return filterIncludeOptions
    }

    if (props.itemsList) {
        console.log("ItemsList:", props.itemsList)
    }
    

    return (

        <div className="SearchBox">
            <input className="SearchBoxInput" type="text" value={searchValue} placeholder={props.placeholder} onChange={(e) => setSearchValue(e.target.value)} />
            {props.itemsList && displayOptions(props.itemsList).map((item) => (<div key={item.Value} className="SearchBoxDropDownList" onClick={() => {setSearchValue(item.Label); props.setOption(item)}}>{item.Label}</div>))}
            {/* {props.itemsList && props.itemsList.filter((item) => searchFilter(item.Label)).map((item) => (<div key={item.Value} onClick={() => {setSearchValue(item.Label); props.setOption(item)}}>{item.Label}</div>))} */}
        </div>
    )

}

export default SearchBox;