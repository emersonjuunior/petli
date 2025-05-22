import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { IPet } from "../interfaces/Pet";
import { useUserContext } from "../context/UserContext";

export const usePets = () => {
  const [error, setError] = useState<string | null>(null);
  const { setAvailablePets } = useUserContext();

  // salva o novo pet no banco de dados
  const createPet = async (data: IPet) => {
    try {
      const ref = doc(db, "pets", data.id);

      await setDoc(ref, data);

      setAvailablePets((prev: IPet[]) => [data, ...prev]);
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    }
  };

  return {
    createPet,
    error,
  };
};
