import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { IPet } from "../interfaces/Pet";
import { useUserContext } from "../context/UserContext";
import isEqual from "lodash.isequal";

export const usePets = () => {
  const [error, setError] = useState<string | null>(null);
  const { availablePets, setAvailablePets } = useUserContext();

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

  // função de editar o pet
  const editPet = async (data: IPet) => {
    const currentPet = availablePets.find((pet) => pet.id === data.id);

    const cleanData = cleanObject(data);
    const cleanPet = cleanObject(currentPet);

    // verifica se há alguma alteração
    if (isEqual(cleanData, cleanPet)) {
      console.log("Não houve nenhuma alteração.");
    } else {
      console.log("Houve alteração.");
    }
  };

  // limpa os objetos antes de comparar
  const cleanObject = (obj: any) => {
    const cleanedObj: any = {};

    Object.entries(obj).forEach(([key, value]) => {
      if (key === "createdAt") {
        return;
      }

      if (
        value !== undefined &&
        value !== "" &&
        value !== null &&
        (typeof value !== "object" || (value && Object.keys(value).length > 0))
      ) {
        cleanedObj[key] = value;
      }
    });

    return cleanedObj;
  };

  return {
    createPet,
    editPet,
    error,
  };
};
