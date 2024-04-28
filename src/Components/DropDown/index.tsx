import React, {memo, useCallback} from 'react';
import './DropDown.scss';
import {DropDownProps, NameInterface} from "../../lib/types-interfaces";


const DropDown: React.FunctionComponent<DropDownProps> = (
    {countriesNamesData, setCountriesNamesInputValue,
        countriesNamesInputValue, showDropDown, setShowDropDown}:DropDownProps) => {
    const isDataArray = Array.isArray(countriesNamesData)

    const onItemClick = useCallback((name:NameInterface)=> {
        setCountriesNamesInputValue(name.common);
        setShowDropDown(false);
    },[setCountriesNamesInputValue, setShowDropDown])

    const formattedName = (name: string) => {
        const highlightedContent = name.replace(countriesNamesInputValue,
            `<mark>${countriesNamesInputValue}</mark>`)
        return  highlightedContent
    }

  return (
    <>
      {showDropDown && <div className="dropDownComponentWrap">
      <ul className="dropDownComponent">
          {isDataArray && countriesNamesData?.map((countryName, ind)=>{
              const {name} = countryName
              return <li key={name.common+ind} onClick={()=>onItemClick(name)}
                         dangerouslySetInnerHTML={{__html: formattedName(name.common)}}/>
          })}
          {!isDataArray && <li>No results were founded...</li>}
      </ul>
      </div>}
    </>
  );
}

export default memo(DropDown);
