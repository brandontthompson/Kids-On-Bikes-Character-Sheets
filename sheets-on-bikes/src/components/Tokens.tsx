import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { IdContext } from "../providers/IdProvider";
import { updateSheet } from "../functions/updateSheetCall";
import { TokenContext } from "../providers/TokenProvider";
import InputGroup from "react-bootstrap/esm/InputGroup";

const Tokens = () => {
  const { tokens, setTokens } = useContext(TokenContext);
  const { id } = useContext(IdContext);

  const handleClick = (val: number) => {
    let value = Math.max(0, tokens + 1 * val);
    setTokens(value);
    updateSheet({ object_id: id, changes: { adversity_tokens: value } });
  };

  return (
    <div className="d-flex justify-content-center container group border-thin">
      <h5>Adversity Tokens</h5>
      <ButtonGroup aria-label="Basic example" className="border-thin group">
        <Button className="transparent" onClick={() => handleClick(-1)}>
          -
        </Button>
        <Button className="transparent">{tokens}</Button>
        <Button className="transparent" onClick={() => handleClick(1)}>
          +
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Tokens;
