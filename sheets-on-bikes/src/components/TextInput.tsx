import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import useClickOutside from "../functions/useClickOutside";
import { Note } from "./Notes";

interface props {
  createCallback: Function;
  editCallback: Function;
}

const TextInput = ({ createCallback, editCallback }: props) => {
  const [content, setContent] = useState("");

  function handleClickOutside() {
    createCallback(content);
  }

  const ref = useClickOutside(handleClickOutside);

  return (
    <div ref={ref}>
      <Form.Label htmlFor="textArea">New Note</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        id="textArea"
        aria-describedby="helpBlock"
        onChange={(event) => {
          setContent(event.target.value);
        }}
      />
      <Form.Text id="helpBlock" muted>
        Do not store personal information, data is NOT encrypted
      </Form.Text>
    </div>
  );
};

export default TextInput;
