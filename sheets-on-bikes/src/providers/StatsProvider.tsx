import { createContext, useState } from "react";
import { statData } from "../types/stat";

export const StatsContext = createContext<any>(null);

const StatsProvider = ({ children }: any) => {
  const [stats, setStats] = useState<statData>();

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsProvider;
