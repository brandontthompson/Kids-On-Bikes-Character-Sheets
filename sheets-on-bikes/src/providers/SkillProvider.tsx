import { createContext, useState } from "react";
import { strength } from "../types/strength";

export const SkillContext = createContext<any>(null);

const SkillProvider = ({ children }: any) => {
  const [skills, setSkills] = useState<strength[]>([]);

  return (
    <SkillContext.Provider value={{ skills, setSkills }}>
      {children}
    </SkillContext.Provider>
  );
};

export default SkillProvider;
