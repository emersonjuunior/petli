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
  updateDoc,
  increment,
  deleteField,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { useUserContext } from "../context/UserContext";
import { IRequest } from "../interfaces/Request";

export const useAdoptionRequest = () => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentRequestsReceived, setCurrentRequestsReceived] = useState<
    IRequest[]
  >([]);
  const {
    username,
    setRequestsSent,
    setRequestsReceived,
    hasLoadedReceived,
    setHasLoadedReceived,
    hasLoadedSent,
    setHasLoadedSent,
    setRequestsAlreadySent,
    loadedRequests,
    setLoadedRequests,
    showSuccessNotification,
    requestsReceived,
    setAvailablePets,
  } = useUserContext();

  // pega os dados das solicitações de contato enviadas
  const getRequestsSent = async () => {
    try {
      setRequestLoading(true);

      // verifica se os dados já foram carregados antes
      if (hasLoadedSent) {
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

  // pega os dados das solicitações de contato recebidas
  const getRequestsReceived = async (
    petId: string,
    pendingRequests: number
  ) => {
    try {
      setRequestLoading(true);

      if (pendingRequests === 0) {
        setRequestLoading(false);
        return;
      }

      if (hasLoadedReceived.includes(petId)) {
        const filterRequests = requestsReceived.filter(
          (request) => request.petId === petId
        );

        setCurrentRequestsReceived(filterRequests);
        setRequestLoading(false);
        return;
      }

      const col = collection(db, "adoptionRequests");

      const q = query(col, where("petId", "==", petId));

      const querySnapshot = await getDocs(q);

      // atualiza o state com o dado dos pets disponiveis
      if (!querySnapshot.empty) {
        const adoptionRequests: IRequest[] = querySnapshot.docs.map(
          (doc) => doc.data() as IRequest
        );

        // atualiza o state local
        setRequestsReceived((prev) => {
          const newRequests = adoptionRequests.filter(
            (newReq) => !prev.some((prevReq) => prevReq.petId === newReq.petId)
          );
          return [...prev, ...newRequests];
        });

        setCurrentRequestsReceived((prev) => {
          const newRequests = adoptionRequests.filter(
            (newReq) => !prev.some((prevReq) => prevReq.petId === newReq.petId)
          );
          return [...prev, ...newRequests];
        });
      }

      setHasLoadedReceived((prev) => [...prev, petId]);
      setRequestLoading(false);
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
    owner: string,
    species: string,
    petImage: string,
    adoptionAnswers: string,
    petName: string,
    adoptionQuestions: string
  ) => {
    try {
      setLoading(true);
      const docId = `${username}-${petId}`;

      // imagem compactada
      const newImage = petImage.replace("w_600", "w_300");

      const newRequest: IRequest = {
        requestId: docId,
        petId,
        petProfile: petId,
        petImage: newImage,
        date: Timestamp.now(),
        text,
        location,
        owner,
        status: "Em análise",
        interested: username!,
        adoptionAnswers,
        petName,
        adoptionQuestions,
      };

      // cria um documento com id do username-petId
      const docRef = doc(db, "adoptionRequests", docId);
      await setDoc(docRef, newRequest);

      // incrementa o campo pendingRequests em +1
      const petRef = doc(db, "pets", petId);
      await updateDoc(petRef, {
        pendingRequests: increment(1),
      });

      // atualiza o state local do usuario
      setRequestsSent((prev: IRequest[]) => [newRequest, ...prev]);
      setRequestsAlreadySent((prev) => [...prev, petId]);
      setLoadedRequests((prev) => [...prev, petId]);

      showSuccessNotification(
        `Solicitação enviada! Você pode acompanhar suas adoções em "Minhas Adoções". ${
          species === "Gato" ? "🐱" : "🐶"
        }`
      );
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
      setRequestLoading(false);
      return;
    }

    const docId = `${username}-${petId}`;
    const docRef = doc(db, "adoptionRequests", docId);
    const docSnap = await getDoc(docRef);

    // se já existir a requisição, salva na memória
    if (docSnap.exists()) {
      const data = docSnap.data();
      setRequestsAlreadySent((prev: string[]) => [data.petProfile, ...prev]);
    }

    // salva na memória as buscas já feitas
    setLoadedRequests((prev) => [...prev, petId]);

    setRequestLoading(false);
  };

  const acceptOrRejectRequest = async (
    request: IRequest,
    approved: boolean,
    petContact: string
  ) => {
    try {
      setBtnLoading(true);

      // decrementa o campo pendingRequests em -1
      const petRef = doc(db, "pets", request.petId);

      // monta o objeto de atualização do pet
      const petUpdateData: any = {
        pendingRequests: increment(-1),
      };

      // se a solicitação for aceita, adiciona o adotante na lista de quem pode ver o contato do responsável
      if (approved) {
        petUpdateData.allowedAdopters = arrayUnion(request.interested);
      }

      await updateDoc(petRef, petUpdateData);

      // monta o novo objeto de atualização
      const updatedRequest = {
        petId: deleteField(), // limpa o campo que é usado para filtrar a solicitação pro dono
        status: approved ? "Aprovada" : "Recusada",
        petProfile: request.petId,
        ...(approved && { petContact }), // adiciona o contato, caso a solicitação seja aceita
      };

      // atualiza os dados no firestore
      const requestRef = doc(db, "adoptionRequests", request.requestId);
      await updateDoc(requestRef, updatedRequest);

      // atualiza o state local
      setAvailablePets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === request.petId
            ? {
                ...pet,
                pendingRequests: pet.pendingRequests - 1,
              }
            : pet
        )
      );

      // atualiza o state local de solicitações recebidas
      setRequestsReceived((prevRequests) =>
        prevRequests.filter((r) => r.requestId !== request.requestId)
      );

      setCurrentRequestsReceived((prevRequests) =>
        prevRequests.filter((r) => r.requestId !== request.requestId)
      );

      // mensagem de sucesso
      if (approved) {
        showSuccessNotification("Solicitação aprovada com sucesso! 🐾");
      } else {
        showSuccessNotification("Solicitação recusada! 🐾");
      }
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteRequest = async (request: IRequest) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "adoptionRequests", request.requestId));

      // se a solicitação ainda estiver em análise, decrementa em 1 o campo pendingRequests do pet
      if (request.status === "Em análise") {
        const petRef = doc(db, "pets", request.petId);
        await updateDoc(petRef, {
          pendingRequests: increment(-1),
        });
      }

      //limpa o state local
      setRequestsSent((r) =>
        r.filter((r) => r.requestId !== request.requestId)
      );

      showSuccessNotification("Solicitação removida com sucesso!");
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return {
    getRequestsReceived,
    getRequestsSent,
    createAdoptionRequest,
    checkAdoptionRequest,
    requestLoading,
    error,
    loading,
    currentRequestsReceived,
    acceptOrRejectRequest,
    deleteRequest,
    btnLoading,
  };
};
