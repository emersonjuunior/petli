import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { ILogin, IUser, IFirestoreUsername } from "../interfaces/User";
import { User } from "firebase/auth";
import { useUserContext } from "../context/UserContext";

export const useAuthentication = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<null | boolean>(null);
  const {
    setDisplayName,
    setSuccessMsg,
    showSuccessNotification,
    setUsername,
  } = useUserContext();

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
    setError(null);

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
      await setDoc(usernameRef, {
        uid: user.uid,
        displayName: user.displayName,
        username: data.username,
      });

      setDisplayName(data.displayName);

      showSuccessNotification("Conta criada com sucesso! 🐾");
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

  // cadastro com google
  const signInWithGoogle = async () => {
    try {
      const userCreds = await signInWithPopup(auth, googleProvider);

      const isNewUser = (userCreds as any)?._tokenResponse?.isNewUser;

      if (isNewUser) {
        await updateProfile(userCreds.user, {
          displayName: "Google",
        });

        setDisplayName("Google");

        showSuccessNotification("Conta criada com sucesso! 🐾");
      } else {
        showSuccessNotification("Bem-vindo de volta! 🐱");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // login
  const login = async (data: ILogin) => {
    if (checkIfIsCancelled()) return;
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      showSuccessNotification("Bem-vindo de volta! 🐱");
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setError(
          "Credenciais inválidas. Por favor, verifique suas informações."
        );
      } else {
        setError("Algo deu errado, tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = () => {
    if (checkIfIsCancelled()) return;
    signOut(auth);
    showSuccessNotification("Até logo, volte sempre! 🐶");
  };

  // definir nome de usuário no firestore
  const setFirestoreUsername = async (user: User, data: IFirestoreUsername) => {
    setLoading(true);
    setError(null);

    try {
      // verifica se o nome de usuário já existe no firestore
      const usernameRef = doc(db, "usernames", data.username);
      const usernameSnapshot = await getDoc(usernameRef);

      if (usernameSnapshot.exists()) {
        setError("Esse nome de usuário já está em uso.");
        return;
      }

      await updateProfile(user, {
        displayName: data.displayName,
      });

      // salva o usuário no banco de dados
      await setDoc(usernameRef, {
        uid: user.uid,
        displayName: user.displayName,
        username: data.username,
      });

      setUsername(data.username);
      setDisplayName(data.displayName);
      showSuccessNotification("Nome de usuário definido com sucesso. 🐶");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // recuperar senha
  const recoverPassword = async (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showSuccessNotification(
          "Se o email estiver cadastrado, você receberá um link para redefinir sua senha. 🔑"
        );
      })
      .catch(() => {
        setError("Algo deu errado, tente novamente mais tarde.");
      });
  };

  return {
    createUser,
    signInWithGoogle,
    login,
    logout,
    setFirestoreUsername,
    recoverPassword,
    loading,
    error,
    setError,
  };
};
