// RandomColorContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface RandomColorContextProps {
  children: ReactNode;
}

interface RandomColorContextValue {
  randomColor: string;
  randomValue: number;
}

const colors = ["#bf1e2e", "#1c4e50", "#6D2121"];

const RandomColorContext = createContext<RandomColorContextValue | undefined>(
  undefined
);

export const RandomColorProvider: React.FC<RandomColorContextProps> = ({
  children,
}) => {
  const [randomValue] = useState<number>(
    Math.floor(Math.random() * colors.length)
  );

  function getRandomColor() {
    return colors[randomValue];
  }

  return (
    <RandomColorContext.Provider
      value={{ randomColor: getRandomColor(), randomValue }}
    >
      {children}
    </RandomColorContext.Provider>
  );
};

export const useRandomColor = (): RandomColorContextValue => {
  const context = useContext(RandomColorContext);
  if (!context) {
    throw new Error("useRandomColor must be used within a RandomColorProvider");
  }
  return context;
};
