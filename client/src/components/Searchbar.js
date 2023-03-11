import React, { useState } from "react";
import styled from "@emotion/styled";
import { HOST } from "../utls/constants";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";

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

const Image = styled("img")`
  width: 400px;
  height: 400px;
`;

const Center = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const rawResponse = await fetch(`${HOST}/api/submit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: search }),
    });
    setLoading(false);
    const content = await rawResponse.json();

    setImage(content);
  };

  if (loading) {
    return (
      <Center>
        <Loading />;
      </Center>
    );
  }

  return image ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        key={image}
      >
        <Image src={image} />
      </motion.div>
    </AnimatePresence>
  ) : (
    <form onSubmit={handleSubmit}>
      {" "}
      :
      <Input
        onChange={handleSearch}
        onSubmit={handleSubmit}
        placeholder="Search..."
      />
    </form>
  );
};

export default Searchbar;
