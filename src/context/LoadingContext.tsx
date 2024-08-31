import { createContext, ReactNode, useState } from "react";

export interface LoadingContextProps {
  loading: boolean | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
