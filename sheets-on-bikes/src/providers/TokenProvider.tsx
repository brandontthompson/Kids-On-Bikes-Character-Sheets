import { createContext, useState } from "react";

export const TokenContext = createContext<any>(null);

const TokenProvider = ({ children }: any) => {
  const [tokens, setTokens] = useState<number>(0);

  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
