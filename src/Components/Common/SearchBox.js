import React, {useState, useMemo } from 'react';
import './Common.css'

function SearchBox({itemsList, placeholder, setOption }) {

    const [searchValue, setSearchValue] = useState("");

    const displayItems = useMemo(() => {
        return itemsList && itemsList.filter((item) => searchFilter(item.Label)).sort().splice(0, 9)
    }, [itemsList, searchValue]);

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
            <input className="SearchBox__Input" type="text" value={searchValue} placeholder={placeholder} onChange={(e) => setSearchValue(e.target.value)} />
            {displayItems && displayItems.map((item) => (<div key={item.Value} className="SearchBox__DropDownList" onClick={() => {setSearchValue(item.Label); setOption(item)}}>{item.Label}</div>))}
            {/* {itemsList && itemsList.filter((item) => searchFilter(item.Label)).map((item) => (<div key={item.Value} onClick={() => {setSearchValue(item.Label); setOption(item)}}>{item.Label}</div>))} */}
        </div>
    )
}

export default SearchBox;