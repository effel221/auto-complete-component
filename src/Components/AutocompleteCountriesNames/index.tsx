import React, {memo, useEffect, useRef, useState} from 'react';
import './AutocompleteCountriesNames.scss';
import {useDebounce} from "../../lib/debounce";
import DropDown from "../DropDown";
import {CountriesNamesDataTypes} from "../../lib/types-interfaces";


const AutocompleteCountriesNames: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [countriesNameSearchTerm, setCountriesNameSearchTerm] = useState<string>("");
  const [countriesNamesData, setCountriesNamesData] = useState<CountriesNamesDataTypes>([]);
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

  useEffect(()=> {
      const getCountriesNames = async () => {
          setIsLoading(true)
          let response;
          const countriesNamesUrl = `https://restcountries.com/v3.1/name/${debouncedCountriesNameTerm}?fields=name`;
          response = await fetch(countriesNamesUrl);
          setCountriesNamesData( await response.json());
          setIsLoading(false)
      }
      debouncedCountriesNameTerm?.length > 0 && getCountriesNames()
      debouncedCountriesNameTerm?.length === 0 && clearCountriesNames()
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
      />
    </section>
  );
}

export default memo(AutocompleteCountriesNames);
