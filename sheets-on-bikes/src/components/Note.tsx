import { ReactNode } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import { Note as N } from "./Notes";

interface props {
  note: N;
  // editCallback: Function;
}

const Note = ({ note }: props) => {
  // const handleEdit = (note: N) => {
  //   // setContent(note.content);
  //   note.content = ;
  // };

  const variant = "dark";
  if (!note.content) return <></>;
  return (
    <Card
      bg={variant.toLowerCase()}
      key={variant}
      text={variant.toLowerCase() === "light" ? "dark" : "white"}
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Header>
        <div className="d-flex justify-content-between">
          {/* <Button
            variant=""
            // onClick={() => {
            //   handleEdit(note);
            // }}
          >
            ✏️
          </Button>
          <Button variant="">⛔️</Button> */}
        </div>
      </Card.Header>
      <Card.Body>
        {/* <Card.Title>{variant} Card Title </Card.Title> */}
        <Card.Text>{note.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
