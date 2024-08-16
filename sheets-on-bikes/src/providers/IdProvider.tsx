import { createContext, useState } from "react";

export const IdContext = createContext<any>(null);

const IdProvider = ({ children }: any) => {
  const [id, setId] = useState<string>();
  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};

export default IdProvider;
