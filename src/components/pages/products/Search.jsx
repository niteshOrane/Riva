import React from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Search = ({ onSearch, items, handleSelect }) => {

  return (
    <div id="mySearch" style={{ width: 200 }}>
      <ReactSearchAutocomplete
        items={items || [{title:"Please wait..."}]}
        onSearch={onSearch}
        styling={{
          zIndex: 1000,
          cursor: "pointer",
        }}
        onSelect={handleSelect}
        placeholder="Search..."
        inputDebounce={100}
        fuseOptions={{ keys: ["title"] }}
        resultStringKeyName="title"
        
      />
    </div>
  );
};
export default Search;
