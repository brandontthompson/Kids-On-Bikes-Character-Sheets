import Button from "react-bootstrap/esm/Button";
import Note from "./Note";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ButtonToolbar from "react-bootstrap/esm/ButtonToolbar";
import { useState } from "react";
import TextInput from "./TextInput";

export interface Note {
  id: number;
  content: string;
}

const Notes = () => {
  const [showInput, setShowInput] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = (content: string) => {
    const newNote: Note = {
      id: notes.length + 1,
      content: content,
    };
    setNotes([newNote, ...notes]);
  };

  // const editNote = (note: Note) => {
  //   note.content =
  // }
  // const notesList = ["NOTE 1"];
  return (
    <div>
      <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
        <div className="h1 p-2">Notes</div>
        <ButtonGroup className="me-2 p-2" aria-label="First group">
          <Button variant="primary" onClick={() => setShowInput(!showInput)}>
            {showInput && "Save"}
            {!showInput && "Create"}
          </Button>{" "}
        </ButtonGroup>
      </ButtonToolbar>
      {showInput && (
        <TextInput
          createCallback={addNote}
          editCallback={(n: Note) => {
            console.log(n);
          }}
        />
      )}
      {notes.map((note) => (
        <Note note={note} />
      ))}
    </div>
  );
};

export default Notes;
