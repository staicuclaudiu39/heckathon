import styled from "@emotion/styled";
import React from "react";
import loading from "../utls/loading.webp";

const LoadingCircle = styled("img")`
  height: 50px;
  width: 50px;
`;

const Loading = () => {
  return <LoadingCircle src={loading} />;
};

export default Loading;
