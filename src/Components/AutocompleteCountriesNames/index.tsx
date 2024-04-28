import React, {memo, useEffect, useRef, useState} from 'react';
import './AutocompleteCountriesNames.scss';
import {useDebounce} from "../../lib/debounce";
import DropDown from "../DropDown";
import {CountriesNamesDataTypes} from "../../lib/types-interfaces";
import {fetchDataCache, updateCacheData} from "../../lib/FetchDataCacheClass";


const AutocompleteCountriesNames: React.FunctionComponent = () => {
  const [countriesNamesInputValue, setCountriesNamesInputValue] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [countriesNamesSearchTerm, setCountriesNamesSearchTerm] = useState<string>("");
  const [countriesNamesData, setCountriesNamesData] = useState<CountriesNamesDataTypes>([]);
  const countriesNameSearchRef = useRef<HTMLInputElement>(null);
  const debouncedNameTerm = useDebounce(countriesNamesSearchTerm, 300);

  const changeSearchValue = () => {
      if (countriesNameSearchRef.current) {
          setCountriesNamesSearchTerm(countriesNameSearchRef.current.value);
          setCountriesNamesInputValue(countriesNameSearchRef.current.value);
      }
  }

  const clearCountriesNames = () => {
      setCountriesNamesSearchTerm("")
      setCountriesNamesInputValue("")
      setCountriesNamesData([])
  }

  useEffect(()=> {
      const getCountriesNames = async () => {
          setIsLoading(true)
          let response;
          const countriesNamesUrl = `https://restcountries.com/v3.1/name/${debouncedNameTerm}?fields=name`;
          response = await fetch(countriesNamesUrl);
          const formattedData = await response.json()
          setCountriesNamesData(formattedData);
          fetchDataCache.setNewData(debouncedNameTerm, formattedData)
          setIsLoading(false)
      }
      if (debouncedNameTerm?.length > 0) {
        setShowDropDown(true)
        updateCacheData(debouncedNameTerm, getCountriesNames, setCountriesNamesData)
      } else {
          clearCountriesNames()
      }
  }, [debouncedNameTerm])

  return (
    <section className="autocompleteCountriesName">
      <form className="autocompleteCountriesNameSearchWrapper" role="search">
          <input
              ref={countriesNameSearchRef}
              placeholder="Autocomplete Countries names..."
              id="autocompleteCountriesNameSearch"
              type="text"
              className="autocompleteCountriesNameSearch"
              name="autocompleteCountriesNameSearch"
              aria-label="autocomplete Countries names"
              onChange={changeSearchValue}
              value={countriesNamesInputValue}
              autoComplete={"off"}
          />
          <button
              className="autocompleteCountriesNamesClear"
              aria-label="Clear"
              onClick={clearCountriesNames}
              type="button">x</button>
      </form>
      <DropDown
          countriesNamesData={countriesNamesData}
          setCountriesNamesInputValue={setCountriesNamesInputValue}
          countriesNamesInputValue={countriesNamesInputValue}
          showDropDown={showDropDown}
          setShowDropDown={setShowDropDown}
      />
      {isLoading && <>Loading ....</>}
    </section>
  );
}

export default memo(AutocompleteCountriesNames);
