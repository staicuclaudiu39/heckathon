import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  HOST,
  REACT_APP_PINATA_API_KEY,
  REACT_APP_PINATA_API_SECRET,
} from "../utls/constants";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";
import axios from "axios";

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

const Center = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled(Center)`
  margin-top: 15px;
`;

const Button = styled("button")`
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #d6d6e7 0 3px 7px inset;
    transform: translateY(2px);
  }
`;

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

  const urlToObject = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });

    return file;
  };

  const handleCreateNFT = async () => {
    const img = await urlToObject(image);
    if (img) {
      try {
        const formData = new FormData();
        formData.append("file", img);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
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
        <ButtonWrapper>
          <Button onClick={handleCreateNFT}>Create NFT</Button>
        </ButtonWrapper>
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
