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
import { IPet } from "../interfaces/Pet";
import { IRequestSent, IRequestReceived } from "../interfaces/Request";

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  loading: boolean;
  displayName: string | null;
  setDisplayName: (name: string | null) => void;
  userImage: string | null;
  setUserImage: (name: string | null) => void;
  memberSince: string | null;
  setMemberSince: (name: string | null) => void;
  about: string;
  setAbout: (name: string) => void;
  city: string;
  setCity: (name: string) => void;
  state: string;
  setState: (name: string) => void;
  contact: string;
  setContact: (name: string) => void;
  allowContact: boolean;
  setAllowContact: (name: boolean) => void;
  availablePets: IPet[];
  setAvailablePets: (pet: IPet[]) => void;
  requestsSent: IRequestSent[];
  setRequestsSent: (requests: IRequestSent[]) => void;
  requestsReceived: IRequestReceived[];
  setRequestsReceived: (requests: IRequestReceived[]) => void;
  successMsg: string;
  setSuccessMsg: (msg: string) => void;
  successNotification: boolean;
  showSuccessNotification: (msg: string) => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [about, setAbout] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [allowContact, setAllowContact] = useState<boolean>(false);
  const [availablePets, setAvailablePets] = useState<IPet[]>([]);
  const [requestsSent, setRequestsSent] = useState<IRequestSent[]>([]);
  const [requestsReceived, setRequestsReceived] = useState<IRequestReceived[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [successNotification, setSuccessNotification] =
    useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await fetchUsername(currentUser.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDisplayName(user ? user.displayName : null);
    setUserImage(user ? user.photoURL : null);
  }, [user]);

  const fetchUsername = async (uid: string) => {
    try {
      const usernamesRef = collection(db, "usernames");
      const q = query(usernamesRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // atribui o valor do firestore aos states
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setUsername(doc.id);

        // verifica se os valores existem, e se existir, atualiza os states locais
        if (data.displayName !== undefined) setDisplayName(data.displayName);
        if (data.memberSince !== undefined) setMemberSince(data.memberSince);
        if (data.about !== undefined) setAbout(data.about);
        if (data.city !== undefined) setCity(data.city);
        if (data.state !== undefined) setState(data.state);
        if (data.contact !== undefined) setContact(data.contact);
        if (data.allowContact !== undefined) setAllowContact(data.allowContact);
      }
    } catch (error) {
      console.error("Erro ao buscar username:", error);
    }
  };

  const showSuccessNotification = (msg: string): void => {
    setSuccessMsg(msg);
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
        userImage,
        setUserImage,
        memberSince,
        setMemberSince,
        about,
        setAbout,
        city,
        setCity,
        state,
        setState,
        contact,
        setContact,
        allowContact,
        setAllowContact,
        availablePets,
        setAvailablePets,
        requestsSent,
        setRequestsSent,
        requestsReceived,
        setRequestsReceived,
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

// hook para consumir o contexto
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext só pode ser usado dentro de um UserProvider."
    );
  }
  return context;
};
