import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { IPet, IDonatedPet } from "../interfaces/Pet";
import { useUserContext } from "../context/UserContext";
import { usePetContext } from "../context/PetContext";

interface IUsername {
  username: string | null;
  uid?: string;
  displayName: string | null;
  userImage: string | null;
  memberSince: string | null;
  donatedPets: IDonatedPet[];
  adoptedPets: IDonatedPet[];
  about?: string;
  city?: string;
  state?: string;
}

// pega o nome do usuário ou pet através dos parametros da url e busca no firestore
export const useGetProfile = (col: string, profileUsername: string) => {
  const [user, setUser] = useState<IUsername | null>(null);
  const [pet, setPet] = useState<IPet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { allPets } = usePetContext();
  const {
    username: currentUsername,
    userImage,
    displayName,
    memberSince,
    adoptedPets,
    donatedPets,
    about,
    city,
    state,
  } = useUserContext();

  useEffect(() => {
    const getUserDocument = async () => {
      setLoading(true);
      try {
        const petsId = allPets.map((pet) => pet.id);

        if (currentUsername === profileUsername) {
          setUser({
            username: currentUsername,
            userImage,
            displayName,
            memberSince,
            adoptedPets,
            donatedPets,
            about,
            city,
            state,
          });
          setLoading(false);
          return { user, loading };
        }

        // verifica se já tem os dados do pet no state que armazena todos os pets
        if (petsId.includes(profileUsername)) {
          // atualiza o state com o dado que já existe
          const currentPet = allPets.find((pet) => pet.id === profileUsername);
          setPet(currentPet!);
          setLoading(false);
          return;
        }

        const ref = doc(db, col, profileUsername);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const userData = snapshot.data();
          if (col === "usernames") {
            setUser(userData as IUsername);
          } else if (col === "pets") {
            setPet(userData as IPet);
          }
        }
        setLoading(false);
      } catch (err) {
        setError("Erro ao buscar o usuário.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (profileUsername) {
      getUserDocument();
    }
  }, [col, profileUsername]);

  return { user, pet, loading, error };
};
