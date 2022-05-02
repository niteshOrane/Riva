import React from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Search = ({ onSearch, items, handleSelect }) => {

  return (
    <div id="mySearch" style={{ width: 200 }}>
      <ReactSearchAutocomplete
        items={items}
        onSearch={onSearch}
        styling={{
          zIndex: 1000,
          cursor: "pointer",
        }}
        onSelect={handleSelect}
        placeholder="Search..."
        inputDebounce={50}
        fuseOptions={{ keys: ["title"] }}
        resultStringKeyName="title"
        on
      />
    </div>
  );
};
export default Search;
