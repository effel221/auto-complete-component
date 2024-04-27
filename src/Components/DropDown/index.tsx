import React, {memo, useCallback} from 'react';
import './DropDown.scss';
import {DropDownProps, NameInterface} from "../../lib/types-interfaces";


const DropDown: React.FunctionComponent<DropDownProps> = (
    {countriesNamesData, setCountriesNameSearchTerm}:DropDownProps) => {
    const isDataArray = Array.isArray(countriesNamesData)

    const onItemClick = useCallback((name:NameInterface)=> {
        setCountriesNameSearchTerm(name.common)
    },[setCountriesNameSearchTerm])

  return (
      <ul className="dropDownComponent">
        {isDataArray && countriesNamesData?.map((countryName, ind)=>{
            const {name} = countryName
            return <li key={name.common+ind} onClick={()=>onItemClick(name)}>
                {name.common}
            </li>
        })}
        {!isDataArray && <li>No results were founded...</li>}
      </ul>
  );
}

export default memo(DropDown);
