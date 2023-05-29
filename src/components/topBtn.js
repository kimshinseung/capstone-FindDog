import styled from "styled-components";
import React from "react";

const UpButton = () => {
  return (
    <>
      <a href="#up">
        <UpDiv> TOP ▲ </UpDiv>
      </a>
    </>
  );
};

export default UpButton;

const UpDiv = styled.button`
  z-index: 2;
  position: fixed;
  bottom: 10px;
  right: 12px;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  outline: none;
  background-color: #95C77E;
  color: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;