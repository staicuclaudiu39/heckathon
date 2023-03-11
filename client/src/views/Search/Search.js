import React from "react";
import Searchbar from "../../components/Searchbar";
import styled from "@emotion/styled";

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  width: 100%;
  float: none;
  position: absolute;
  box-shadow: none;
  overflow: visible;
  min-height: 100%;
  background: #0a0d0b;
`;

const Typography = styled("div")`
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  color: white;
  text-align: center;

  margin-bottom: 10px;
`;

const Search = () => {
  return (
    <Wrapper>
      <div>
        <Typography>NFTxt</Typography>
        <Searchbar />
      </div>
    </Wrapper>
  );
};

export default Search;
