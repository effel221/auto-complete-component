import React, {useRef, useState} from 'react';
import './AutocompleteCountryName.scss';

const AutocompleteCountryName: React.FunctionComponent = () => {
  const [countryNameSearchTerm, setCountryNameSearchTerm] = useState<string>("")
  const countryNameSearchRef = useRef<HTMLInputElement>(null)

  return (
    <section className="autocompleteCountryName">
      <form className="autocompleteCountryNameSearchWrapper" role="search">
          <input
              ref={countryNameSearchRef}
              placeholder="Auto complete country name..."
              id="autocompleteCountryNameSearch"
              type="text"
              className="autocompleteCountryNameSearch"
              name="autocompleteCountryNameSearch"
              aria-label="autocomplete country name search"
          />
          <button
              className="autocompleteCountryNameClear"
              aria-label="Clear"
              type="button">x</button>
      </form>
    </section>
  );
}

export default AutocompleteCountryName;
