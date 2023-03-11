import React from "react";
import Searchbar from "../../components/Searchbar";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Typography>NFTXT</Typography>
          <Searchbar />
          {/* <Image src="https://www.zelda.com/links-awakening/assets/img/home/hero-char.png" /> */}
        </motion.div>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Search;
