import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  displayName: string | null;
  setDisplayName: (name: string | null) => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDisplayName(user ? user.displayName : null);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, displayName, setDisplayName }}
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
