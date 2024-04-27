import React, {useRef, useState} from 'react';
import './AutocompleteCountryName.scss';

const AutocompleteCountryName: React.FunctionComponent = () => {
  const [countryNameSearchTerm, setCountryNameSearchTerm] = useState<string>("")
  const countryNameSearchRef = useRef<HTMLInputElement>(null)

  return (
    <section className="autocompleteCountry">
      <div className="autocompleteCountryNameSearchWrapper">
          <input
              ref={countryNameSearchRef}
              placeholder="Auto complete country name..."
              id="autocompleteCountryNameSearch"
              type="text"
              className="autocompleteCountryNameSearch"
              name="autocompleteCountryNameSearch"
              aria-label="autocompleteCountryNameSearch"
          />
          <button
              className="autocompleteCountryNameClear"
              type="button">x</button>
      </div>
    </section>
  );
}

export default AutocompleteCountryName;
