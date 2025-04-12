import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { IPet } from "../interfaces/Pet";

interface IUsername {
  username: string;
  uid: string;
  displayName: string;
}

// pega o nome do usuário ou pet através dos parametros da url e busca no firestore
export const useGetProfile = (col: string, username: string) => {
  const [user, setUser] = useState<IUsername | null>(null);
  const [pet, setPet] = useState<IPet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserDocument = async () => {
      setLoading(true);
      try {
        const ref = doc(db, col, username);
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
      }
    };

    if (username) {
      getUserDocument();
    }
  }, [col, username]);

  return { user, pet, loading, error };
};
