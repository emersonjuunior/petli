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
  const {
    username,
    displayName,
    setDisplayName,
    userImage,
    setUserImage,
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
  } = useUserContext();

  // edita o perfil do usuário
  const editProfile = async (updatedUser: IProfile) => {
    try {
      const userRef = doc(db, "usernames", username!);

      // cria um objeto com os dados atuais do usuario
      const user = {
        displayName,
        userImage,
        about,
        city,
        state,
        contact,
        allowContact,
      };

      // verifica se há alguma alteração
      if (JSON.stringify(user) === JSON.stringify(updatedUser)) {
        console.log("objetos iguais");
        return;
      }

      // monta um novo objeto apenas com as propriedades alteradas
      const data = {
        ...(updatedUser.displayName !== displayName &&
          updatedUser.displayName != "" && {
            displayName: updatedUser.displayName,
          }),
        ...(updatedUser.userImage !== userImage &&
          updatedUser.userImage != "" && {
            userImage: updatedUser.userImage,
          }),
        ...(updatedUser.about !== about &&
          updatedUser.about != "" && {
            about: updatedUser.about,
          }),
        ...(updatedUser.city !== city &&
          updatedUser.city != "" && {
            city: updatedUser.city,
          }),
        ...(updatedUser.state !== state &&
          updatedUser.state != "" && {
            state: updatedUser.state,
          }),
        ...(updatedUser.contact !== contact &&
          updatedUser.contact != "" && {
            contact: updatedUser.contact,
          }),
        ...(updatedUser.allowContact !== allowContact && {
          allowContact: updatedUser.allowContact,
        }),
      };

      console.log(data);
      // envia os dados ao firestore
      await setDoc(userRef, { ...data }, { merge: true });

      // atualiza localmente os dados que foram alterados pelo usuário
      Object.entries(data).forEach(([key, value]) => {
        if (key === "displayName") setDisplayName(value as string);
        if (key === "userImage") setUserImage(value as string);
        if (key === "about") setAbout(value as string);
        if (key === "city") setCity(value as string);
        if (key === "state") setState(value as string);
        if (key === "contact") setContact(value as string);
        if (key === "allowContact") setAllowContact(value as boolean);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { editProfile };
};
