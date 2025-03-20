import { auth, db } from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { IUser } from "../interfaces/User";

export const useAuthentication = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<null | boolean>(null);

  // lida com vazamento de memória
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled(): boolean {
    if (cancelled) {
      return true;
    }
    return false;
  }

  // criar usuário
  const createUser = async (data: IUser) => {
    if (checkIfIsCancelled()) return;
    setLoading(true);

    try {
      // verifica se o nome de usuário já existe no firestore
      const usernameRef = doc(db, "usernames", data.username);
      const usernameSnapshot = await getDoc(usernameRef);

      if (usernameSnapshot.exists()) {
        setError("Esse nome de usuário já está em uso.");
        return;
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      // salva o usuário no banco de dados
      await setDoc(usernameRef, { uid: user.uid });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createUser,
    loading,
    error,
  };
};
