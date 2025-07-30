import { createContext, useContext, useState, ReactNode } from "react";
import { IPet, ISearchPet } from "../interfaces/Pet";
import { DocumentData } from "firebase/firestore";

interface IPetContext {
  displayPets: IPet[];
  setDisplayPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  currentPets: IPet[];
  setCurrentPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  allPets: IPet[];
  setAllPets: React.Dispatch<React.SetStateAction<IPet[]>>;
  initialPetLoad: boolean;
  setInitialPetLoad: React.Dispatch<React.SetStateAction<boolean>>;
  lastFilters: ISearchPet | null;
  setLastFilters: React.Dispatch<React.SetStateAction<ISearchPet | null>>;
  lastVisible: DocumentData | null;
  setLastVisible: React.Dispatch<React.SetStateAction<DocumentData | null>>;
}

const PetContext = createContext<IPetContext | null>(null);

export const PetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // state que exibe os pets na página de filtros
  const [displayPets, setDisplayPets] = useState<IPet[]>([]);
  const [currentPets, setCurrentPets] = useState<IPet[]>([]);
  const [allPets, setAllPets] = useState<IPet[]>([]);
  const [initialPetLoad, setInitialPetLoad] = useState(false);
  const [lastFilters, setLastFilters] = useState<ISearchPet | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);

  return (
    <PetContext.Provider
      value={{
        displayPets,
        setDisplayPets,
        initialPetLoad,
        setInitialPetLoad,
        lastFilters,
        setLastFilters,
        currentPets,
        setCurrentPets,
        allPets,
        setAllPets,
        lastVisible,
        setLastVisible,
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
