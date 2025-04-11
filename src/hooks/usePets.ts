import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { IPet } from "../interfaces/Pet";

export const usePets = () => {
  const [error, setError] = useState<string | null>(null);

  const createPet = async (data: IPet) => {
    try {
      const ref = doc(db, "pets", data.id);

      // salva o novo pet no banco de dados
      await setDoc(ref, data);
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    }
  };

  return {
    createPet,
    error,
  };
};
