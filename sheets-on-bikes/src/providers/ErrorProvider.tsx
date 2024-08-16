import { createContext, useState } from "react";

export const ErrorContext = createContext<any>(null);

const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState<boolean>(false);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
