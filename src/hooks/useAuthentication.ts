import { auth, db, facebookProvider } from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
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
    } catch (error: any) {
      if (error.message.includes("email-already")) {
        setError("Esse usuário já existe.");
      } else {
        setError("Algo deu errado, tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  // cadastro com facebook
  const createUserWithFacebook = async () => {
    try {
      // Abre o pop-up para autenticação
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      // Verifica se o usuário já existe no Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
        console.log("Novo usuário cadastrado:", user);
      } else {
        console.log("Usuário já cadastrado:", user);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return {
    createUser,
    createUserWithFacebook,
    loading,
    error,
    setError,
  };
};
