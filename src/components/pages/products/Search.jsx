import React from "react";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import useArabic from "../../common/arabicDict/useArabic";

const Search = ({ handleChange, value = "", onSearch, handleKeyDown }) => {
  const { translate } = useArabic();

  return (
    <FormControl>
      <Input
        placeholder={translate?.nav?.TYPE}
        style={{ width: "167px" }}
        id="standard-adornment-weight"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        startAdornment={
          <img
            onClick={() => {
              onSearch(value);
            }}
            className="searchBox"
            alt="Enter to Search"
            src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/88518f18-5a2c-4c12-adce-66736037ca22.svg"
          />
        }
        aria-describedby="standard-weight-helper-text"
      />
    </FormControl>
  );
};
export default Search;
