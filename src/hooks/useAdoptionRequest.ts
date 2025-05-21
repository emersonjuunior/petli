import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  setDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { useUserContext } from "../context/UserContext";
import { IRequest } from "../interfaces/Request";

export const useAdoptionRequest = () => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    username,
    requestsSent,
    setRequestsSent,
    setRequestsReceived,
    hasLoadedReceived,
    setHasLoadedReceived,
    hasLoadedSent,
    setHasLoadedSent,
    requestsAlreadySent,
    setRequestsAlreadySent,
    loadedRequests,
    setLoadedRequests,
  } = useUserContext();

  // pega os dados das solicitações de adoção enviadas
  const getRequestsSent = async () => {
    try {
      setRequestLoading(true);

      // verifica se os dados já foram carregados antes
      if (hasLoadedSent) {
        console.log("Dados já existem, requisição não foi feita.");
        setRequestLoading(false);
        return;
      }

      const col = collection(db, "adoptionRequests");

      const q = query(col, where("interested", "==", username));

      const querySnapshot = await getDocs(q);

      // atualiza o state com o dado dos pets disponiveis
      if (!querySnapshot.empty) {
        const adoptionRequests: IRequest[] = querySnapshot.docs.map(
          (doc) => doc.data() as IRequest
        );
        setRequestsSent(adoptionRequests);
      }

      setHasLoadedSent(true);
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setRequestLoading(false);
    }
  };

  // pega os dados das solicitações de adoção recebidas
  const getRequestsReceived = async () => {
    try {
      setRequestLoading(true);

      // verifica se os dados já foram carregados antes
      if (hasLoadedReceived) {
        console.log("Dados já existem, requisição não foi feita.");
        setRequestLoading(false);
        return;
      }

      const docRef = doc(
        db,
        "usernames",
        username!,
        "requestsReceived",
        "requestsReceived"
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        const requests = data.sent as IRequest[];
        console.log(requests);

        // passa os dados para o state e salva na memória que a requisição já foi feita
        setRequestsReceived(requests);
        setHasLoadedReceived(true);
        console.log("Requisição feita");
      }
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setRequestLoading(false);
    }
  };

  // cria uma nova solicitação, adicionando um documento na collection do interessado e do tutor
  const createAdoptionRequest = async (
    petId: string,
    text: string,
    location: string,
    owner: string
  ) => {
    try {
      setLoading(true);

      const newRequest: IRequest = {
        petId,
        date: Timestamp.now(),
        text,
        location,
        owner,
        status: "Em análise",
        interested: username!,
      };

      // cria um documento com id do username-petId
      const docId = `${username}-${petId}`;
      const docRef = doc(db, "adoptionRequests", docId);
      await setDoc(docRef, newRequest);

      // atualiza o state local do usuario
      setRequestsSent((prev: IRequest[]) => [newRequest, ...prev]);
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // verifica se o usuário já fez uma requisição pra esse pet
  const checkAdoptionRequest = async (
    petId: string,
    allowContact: boolean,
    owner: string
  ) => {
    setRequestLoading(true);

    
    // verifica se o responsável do pet é o usuário logado
    if (owner === username) {
      setRequestLoading(false);
      return;
    }

    // verifica se o responsável pelo pet permitiu contato direto
    if (allowContact) {
      setRequestLoading(false);
      return;
    }

    // verifica se o usuário está logado
    if (!username) {
      setRequestLoading(false);
      return;
    }

    // verifica se a requisição nesse pet já foi feita
    if (loadedRequests.includes(petId)) {
      console.log("Requisição já foi feita");
      setRequestLoading(false);
      return;
    }

    const docId = `${username}-${petId}`;
    const docRef = doc(db, "adoptionRequests", docId);
    const docSnap = await getDoc(docRef);

    // se já existir a requisição, salva na memória
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Requisição feita e salva na memória.");
      setRequestsAlreadySent((prev: string[]) => [data.petId, ...prev]);
    }

    // salva na memória as buscas já feitas
    setLoadedRequests((prev) => [...prev, petId]);

    setRequestLoading(false);
  };

  return {
    getRequestsReceived,
    getRequestsSent,
    createAdoptionRequest,
    checkAdoptionRequest,
    requestLoading,
    error,
    loading,
  };
};
