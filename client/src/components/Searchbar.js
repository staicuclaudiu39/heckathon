import React, { useState } from "react";
import styled from "@emotion/styled";
import { HOST } from "../utls/constants";

const Input = styled("input")`
  border: 1px solid grey;
  border-radius: 5px;
  height: 40px;
  width: 400px;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;

  &:hover,
  &:focus {
    border: 1.5px solid gray;
    background-color: white;
  }
`;

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = async () => {
    const rawResponse = await fetch(`${HOST}/api/submit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: search }),
    });
    const content = await rawResponse.json();

    console.log(content);
  };

  const handleKeyDown = (e) => {
    if (e === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Input
      onChange={handleSearch}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      placeholder="Search..."
    />
  );
};

export default Searchbar;
