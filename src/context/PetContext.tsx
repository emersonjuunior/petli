import { createContext, useContext, useState, ReactNode } from "react";
import { IPet } from "../interfaces/Pet";

interface IPetContext {
  pets: IPet[];
  setPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  displayPets: IPet[];
  setDisplayPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  initialPetLoad: boolean;
  setInitialPetLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const PetContext = createContext<IPetContext | null>(null);

export const PetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pets, setPets] = useState<IPet[]>([]);
  // state que exibe os pets na página de filtros
  const [displayPets, setDisplayPets] = useState<IPet[]>([]);
  const [initialPetLoad, setInitialPetLoad] = useState(false);

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        displayPets,
        setDisplayPets,
        initialPetLoad,
        setInitialPetLoad,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

// hook para consumir o contexto
export const usePetContext = (): IPetContext => {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("useContext só pode ser usado dentro de um PetProvider.");
  }

  return context;
};
