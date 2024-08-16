import { ReactNode, useContext, useState } from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import { updateSheet } from "../functions/updateSheetCall";
import { IdContext } from "../providers/IdProvider";

interface props {
  type?: string;
  defaultValue?: string;
  children: ReactNode;
}

const Descriptor = ({ type, defaultValue, children }: props) => {
  const [content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);
  const { id } = useContext(IdContext);

  function handleClickOutside() {
    if (!children || !dirty) return;
    updateSheet({
      object_id: id,
      changes: {
        [children.toString().toLowerCase().replace(":", "")]: content,
      },
    });
    setDirty(false);
  }

  function handleSetContent(newContent: any) {
    if (newContent === content) return;
    setDirty(true);
    setContent(newContent);
  }

  return (
    <div className="p-1">
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          {children}
        </InputGroup.Text>
        <Form.Control
          // {type === "textarea" && `as=${type}`}
          // rows={3}
          defaultValue={defaultValue}
          type={type}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={(e) => handleSetContent(e.target.value)}
          onBlur={() => handleClickOutside()}
        />
      </InputGroup>
    </div>
  );
};

export default Descriptor;
