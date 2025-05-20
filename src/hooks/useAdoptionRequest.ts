import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useUserContext } from "../context/UserContext";

export const useAdoptionRequest = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { username } = useUserContext();

  // cria uma nova solicitação, adicionando um documento na collection do interessado e do tutor
  const createAdoptionRequest = async (
    petId: string,
    text: string,
    location: string,
    owner: string
  ) => {
    try {
      setLoading(true);

      // adiciona a solicitação de adoção na collection do usuário interessado
      const date = new Date();
      const brazilianDate = date.toLocaleDateString("pt-BR");

      const requestSent = {
        petId,
        date: brazilianDate,
        text,
        location,
        owner,
        status: "Em análise",
      };

      await setDoc(
        doc(db, "usernames", username!, "requestsSent", "requestsSent"),
        requestSent
      );

      // adiciona a solicitação de adoção na collection do responsável pelo pet
      const requestReceived = {
        petId,
        date: brazilianDate,
        text,
        location,
        interested: username
      };

      await setDoc(
        doc(db, "usernames", owner, "requestsReceived", "requestsReceived"),
        requestReceived
      );

      console.log("Deu certo");
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return {
    createAdoptionRequest,
    error,
    loading,
  };
};
