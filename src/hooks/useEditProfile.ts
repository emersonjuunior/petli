import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useUserContext } from "../context/UserContext";

interface IProfile {
  displayName: string;
  userImage: string;
  about: string;
  city: string;
  state: string;
  contact: string;
  allowContact: boolean;
}

export const useEditProfile = () => {
  const { username } = useUserContext();

  // edita o perfil do usuário
  const editProfile = async (updatedUser: IProfile) => {
    try {
      const userRef = doc(db, "usernames", username!);

      console.log(updatedUser)

      await setDoc(userRef, { teste: "oi" }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  return { editProfile };
};
