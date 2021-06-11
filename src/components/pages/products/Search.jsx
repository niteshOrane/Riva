import React from "react";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const Search = ({ handleChange, value = "Search" }) =>
   (
    <FormControl>
      <Input
        placeholder="Type here to search"
        id="standard-adornment-weight"
        value={value}
        onChange={handleChange}
        startAdornment={<span className="material-icons">search</span>}
        aria-describedby="standard-weight-helper-text"
      />
    </FormControl>
  );
export default Search;
