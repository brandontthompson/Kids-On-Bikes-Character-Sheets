import { createContext, useState } from "react";
import { note } from "../types/note";

export const NotesContext = createContext<any>(null);

const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<note>();

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
