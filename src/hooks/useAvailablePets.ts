import { useEffect, useState } from "react";
import { IPet } from "../interfaces/Pet";
import { useUserContext } from "../context/UserContext";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useAvailablePets = (usernameId: string) => {
  const {
    availablePets,
    setAvailablePets,
    username,
    hasLoadedAvailablePets,
    setHasLoadedAvailablePets,
  } = useUserContext();
  const [petLoading, setPetLoading] = useState(false);
  const [profileAvailablePets, setProfileAvailablePets] = useState<IPet[]>([]);

  useEffect(() => {
    const getAvailablePets = async () => {
      setPetLoading(true);

      // se for o perfil do usuário logado e já tiver pets disponiveis no contexto, nao faz a requisição
      if (usernameId === username && availablePets.length > 0) {
        setProfileAvailablePets(availablePets);
        setPetLoading(false);
        return;
      }

      // se for o perfil do usuário logado, já tiver sido feita a requisição antes, nao faz ela de novo
      if (usernameId === username && hasLoadedAvailablePets) {
        setProfileAvailablePets(availablePets);
        setPetLoading(false);
        return;
      }

      const col = collection(db, "pets");

      const q = query(col, where("owner", "==", usernameId));

      const querySnapshot = await getDocs(q);

      // atualiza o state com o dado dos pets disponiveis
      if (!querySnapshot.empty) {
        const pets: IPet[] = querySnapshot.docs.map(
          (doc) => doc.data() as IPet
        );
        setProfileAvailablePets(pets);

        // atualiza o state local do usuario
        if (usernameId === username) {
          setAvailablePets(pets);
        }
      }

      // atualiza o state para nao buscar os pets do usuario de novo
      if (usernameId === username) {
        setHasLoadedAvailablePets(true);
      }

      setPetLoading(false);
    };

    if (usernameId) {
      getAvailablePets();
    }
  }, [usernameId]);

  return { petLoading, profileAvailablePets };
};
