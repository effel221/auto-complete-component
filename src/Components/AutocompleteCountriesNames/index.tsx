import React, {memo, useEffect, useRef, useState} from 'react';
import './AutocompleteCountriesNames.scss';
import {useDebounce} from "../../lib/debounce";
import DropDown from "../DropDown";
import {CountriesNamesDataTypes} from "../../lib/types-interfaces";
import {fetchDataCache, updateCacheData} from "../../lib/FetchDataCacheClass";


const AutocompleteCountriesNames: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [countriesNameSearchTerm, setCountriesNameSearchTerm] = useState<string>("");
  const [countriesNamesData, setCountriesNamesData] = useState<CountriesNamesDataTypes>([]);
  const countriesNameSearchRef = useRef<HTMLInputElement>(null);
  const debouncedNameTerm = useDebounce(countriesNameSearchTerm, 300);

  const changeSearchValue = () => {
      countriesNameSearchRef.current &&
      setCountriesNameSearchTerm(countriesNameSearchRef.current.value);
  }

  const clearCountriesNames = () => {
      setCountriesNameSearchTerm("")
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
      debouncedNameTerm?.length > 0 && updateCacheData(debouncedNameTerm, getCountriesNames, setCountriesNamesData)
      debouncedNameTerm?.length === 0 && clearCountriesNames()
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
              value={countriesNameSearchTerm}
              autoComplete={"off"}
          />
          <button
              className="autocompleteCountriesNamesClear"
              aria-label="Clear"
              onClick={clearCountriesNames}
              type="button">x</button>
      </form>
      {isLoading && <>Loading ....</>}
      <DropDown
          countriesNamesData={countriesNamesData}
          setCountriesNameSearchTerm={setCountriesNameSearchTerm}
          debouncedNameTerm={debouncedNameTerm}
      />
    </section>
  );
}

export default memo(AutocompleteCountriesNames);
