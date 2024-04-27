import React from 'react';
import './DropDown.scss';
import {DropDownProps} from "../../lib/types-interfaces";


const DropDown: React.FunctionComponent<DropDownProps> = (
    {countriesNamesData}:DropDownProps) => {
  return (
      <ul className="dropDownComponent">
        {countriesNamesData && countriesNamesData.map((countryName, ind)=>{
             const {name} = countryName
             return <li key={name.common+ind}>
               {name.common}
             </li>
          })}
      </ul>
  );
}

export default DropDown;
