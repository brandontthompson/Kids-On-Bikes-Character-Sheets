import { createContext, useState } from "react";
import { description } from "../types/description";

export const DescriptionContext = createContext<any>(null);

const DescriptionProvider = ({ children }: any) => {
  const [description, setDescription] = useState<description>();

  return (
    <DescriptionContext.Provider value={{ description, setDescription }}>
      {children}
    </DescriptionContext.Provider>
  );
};

export default DescriptionProvider;
