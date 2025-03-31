import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, query, getDocs, where } from "firebase/firestore";

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  loading: boolean;
  displayName: string | null;
  setDisplayName: (name: string | null) => void;
  successMsg: string;
  setSuccessMsg: (msg: string) => void;
  successNotification: boolean;
  showSuccessNotification: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [successNotification, setSuccessNotification] =
    useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
          await fetchUsername(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDisplayName(user ? user.displayName : null);
  }, [user]);

  const fetchUsername = async (uid: string) => {
    try {
      const usernamesRef = collection(db, "usernames");
      const q = query(usernamesRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setUsername(doc.id); // Agora atualiza o contexto diretamente
      } else {
        console.log("Nada encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar username:", error);
    }
  };

  const showSuccessNotification = (): void => {
    setSuccessNotification(true);
    setTimeout(() => {
      setSuccessNotification(false);
    }, 4000);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        loading,
        displayName,
        setDisplayName,
        successMsg,
        setSuccessMsg,
        successNotification,
        showSuccessNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext só pode ser usado dentro de um UserProvider."
    );
  }
  return context;
};
