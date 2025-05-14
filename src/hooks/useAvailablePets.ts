import { useEffect, useState } from "react";
import { IPet } from "../interfaces/Pet";
import { useUserContext } from "../context/UserContext";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useAvailablePets = (usernameId: string) => {
  const { setAvailablePets } = useUserContext();
  const [petLoading, setPetLoading] = useState(false);

  useEffect(() => {
    const getAvailablePets = async () => {
      setPetLoading(true);

      const col = collection(db, "pets");

      const q = query(col, where("owner", "==", usernameId));

      const querySnapshot = await getDocs(q);

      // atualiza o state com o dado dos pets disponiveis
      if (!querySnapshot.empty) {
        const pets: IPet[] = querySnapshot.docs.map(
          (doc) => doc.data() as IPet
        );
        setAvailablePets(pets);
      }

      setPetLoading(false);
    };

    if (usernameId) {
      getAvailablePets();
    }
  }, []);

  return { petLoading };
};
