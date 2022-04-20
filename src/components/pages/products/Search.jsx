import React from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Search = ({ onSearch, items, handleSelect }) => {
  // useEffect(() => {},[it,])
  return (
    <div style={{ width: 200 }}>
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
      />
    </div>
  );
};
export default Search;
