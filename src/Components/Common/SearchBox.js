import React, {useState, useMemo, useEffect } from 'react';
import './Common.css'

function SearchBox({itemsList, placeholder, setOption }) {

    const [searchValue, setSearchValue] = useState("");

    const displayItems = useMemo(() => {
        if (searchValue === "") {
            return itemsList;
        }
        if (itemsList.length > 0 ) {
            return itemsList.filter((item) => searchFilter(item.Label)).sort();
        }   
        return null;    
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
            {displayItems && displayItems.length > 0 && 
                <div className="SearchBox__DropDownList">
                    {displayItems.map((item) => (<div key={item.Value} className="SearchBox__DropDownListItem" onClick={() => {setSearchValue(item.Label); setOption(item)}}>{item.Label}</div>))}
                </div>
            }        
        </div>
    )
}

export default SearchBox;