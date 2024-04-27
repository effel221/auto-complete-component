import React, {memo, useEffect, useRef, useState} from 'react';
import './AutocompleteCountriesNames.scss';
import {useDebounce} from "../../lib/debounce";
import DropDown from "../DropDown";
import {CountriesNamesDataType} from "../../lib/types-interfaces";


const AutocompleteCountriesNames: React.FunctionComponent = () => {
  const [countriesNameSearchTerm, setCountriesNameSearchTerm] = useState<string>("");
  const [countriesNamesData, setCountriesNamesData] = useState<CountriesNamesDataType[]>([]);
  const countriesNameSearchRef = useRef<HTMLInputElement>(null);
  const debouncedCountriesNameTerm = useDebounce(countriesNameSearchTerm, 300);

  const changeSearchValue = () => {
      countriesNameSearchRef.current &&
      setCountriesNameSearchTerm(countriesNameSearchRef.current.value);
  }

  const clearCountriesNames = () => {
      setCountriesNameSearchTerm("")
      setCountriesNamesData([])
  }

  const getCountriesNames = async () => {
      let response;
      const countriesNamesUrl = `https://restcountries.com/v3.1/name/${debouncedCountriesNameTerm}?fields=name`;
      response = await fetch(countriesNamesUrl);
      setCountriesNamesData( await response.json());
  }

  useEffect(()=> {
      debouncedCountriesNameTerm?.length > 0 && getCountriesNames()
  }, [debouncedCountriesNameTerm])

  return (
    <section className="autocompleteCountriesName">
      <form className="autocompleteCountriesNameSearchWrapper" role="search">
          <input
              ref={countriesNameSearchRef}
              placeholder="Autocomplete Countries name..."
              id="autocompleteCountriesNameSearch"
              type="text"
              className="autocompleteCountriesNameSearch"
              name="autocompleteCountriesNameSearch"
              aria-label="autocomplete Countries name search"
              onChange={changeSearchValue}
              value={countriesNameSearchTerm}
          />
          <button
              className="autocompleteCountriesNamesClear"
              aria-label="Clear"
              onClick={clearCountriesNames}
              type="button">x</button>
      </form>
        <DropDown
            countriesNamesData={countriesNamesData}
        />
    </section>
  );
}

export default memo(AutocompleteCountriesNames);
