import { createContext, useContext, useState, ReactNode } from "react";
import { IPet, ISearchPet } from "../interfaces/Pet";

interface IPetContext {
  pets: IPet[];
  setPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  displayPets: IPet[];
  setDisplayPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  allPets: IPet[];
  setAllPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  initialPetLoad: boolean;
  setInitialPetLoad: React.Dispatch<React.SetStateAction<boolean>>;
  lastFilters: ISearchPet | null;
  setLastFilters: React.Dispatch<React.SetStateAction<ISearchPet | null>>;
}

const PetContext = createContext<IPetContext | null>(null);

export const PetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pets, setPets] = useState<IPet[]>([]);
  // state que exibe os pets na página de filtros
  const [displayPets, setDisplayPets] = useState<IPet[]>([]);
  const [allPets, setAllPets] = useState<IPet[]>([]);
  const [initialPetLoad, setInitialPetLoad] = useState(false);
  const [lastFilters, setLastFilters] = useState<ISearchPet | null>(null);

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        displayPets,
        setDisplayPets,
        initialPetLoad,
        setInitialPetLoad,
        lastFilters,
        setLastFilters,
        allPets,
        setAllPets,
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
