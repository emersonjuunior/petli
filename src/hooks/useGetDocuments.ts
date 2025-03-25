import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface IUsername {
  username: string;
  uid: string;
  displayName: string;
}

export const useGetDocuments = (col: string, username: string) => {
  const [user, setUser] = useState<IUsername | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserDocument = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, col, username);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.username && userData.uid && userData.displayName) {
            setUser(userData as IUsername);
          }
        }
      } catch (err) {
        setError("Erro ao buscar o usuário.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getUserDocument();
    }
  }, []);

  return { user, loading, error };
};
