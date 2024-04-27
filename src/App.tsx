import React from 'react';
import './App.scss';
import AutocompleteCountryName from "./Components/AutocompleteCountryName";

const App: React.FunctionComponent = () => {
  return (
    <>
      <header className="App-header" role="banner">
         <h1>Tatsiana's Auto-complete component</h1>
      </header>
      <main role="main">
          <AutocompleteCountryName/>
      </main>
    </>
  );
}

export default App;
