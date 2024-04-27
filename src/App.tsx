import React from 'react';
import './App.scss';
import AutocompleteCountriesNames from "./Components/AutocompleteCountriesNames";

const App: React.FunctionComponent = () => {
  return (
    <>
      <header className="App-header">
         <h1>Tatsiana's Auto-complete component</h1>
      </header>
      <main role="main">
          <AutocompleteCountriesNames/>
      </main>
    </>
  );
}

export default App;
