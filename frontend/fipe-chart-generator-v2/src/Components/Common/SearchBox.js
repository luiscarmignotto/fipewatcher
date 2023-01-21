import React, {useState, useMemo } from 'react';
import './Common.css'

function SearchBox(props) {

    const [searchValue, setSearchValue] = useState("");

    const displayItems = useMemo(() => {
        return props.itemsList && props.itemsList.filter((item) => searchFilter(item.Label)).sort().splice(0, 9)
    }, [props.itemsList, searchValue]);

    function searchFilter(value) {
        const searchTerm = searchValue.toLowerCase();
        const fullName = value.toLowerCase();

        return (
            searchTerm &&
            fullName.includes(searchTerm) &&
            fullName !== searchTerm 
        )       
    }

    return (
        <div className="SearchBox">
            <input className="SearchBox__Input" type="text" value={searchValue} placeholder={props.placeholder} onChange={(e) => setSearchValue(e.target.value)} />
            {displayItems && displayItems.map((item) => (<div key={item.Value} className="SearchBox__DropDownList" onClick={() => {setSearchValue(item.Label); props.setOption(item)}}>{item.Label}</div>))}
            {/* {props.itemsList && props.itemsList.filter((item) => searchFilter(item.Label)).map((item) => (<div key={item.Value} onClick={() => {setSearchValue(item.Label); props.setOption(item)}}>{item.Label}</div>))} */}
        </div>
    )
}

export default SearchBox;