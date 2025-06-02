import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  setDoc,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { IPet } from "../interfaces/Pet";
import { useUserContext } from "../context/UserContext";
import isEqual from "lodash.isequal";
import { deleteImage } from "../utils/deleteImage";
import { useImages } from "./useImages";
import { useNavigate } from "react-router-dom";
import { IDonatedPet } from "../interfaces/Pet";

export const usePets = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    username,
    availablePets,
    setAvailablePets,
    showSuccessNotification,
    setDonatedPets,
  } = useUserContext();
  const { uploadImages } = useImages();

  // salva o novo pet no banco de dados
  const createPet = async (data: IPet) => {
    try {
      const ref = doc(db, "pets", data.id);

      await setDoc(ref, data);

      setAvailablePets((prev: IPet[]) => [data, ...prev]);
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    }
  };

  // função de editar o pet
  const editPet = async (
    data: IPet,
    imageData: FormData,
    moreImagesData: FormData[]
  ) => {
    setLoading(true);

    const currentPet = availablePets.find((pet) => pet.id === data.id);

    // variável que armazena as imagens que foram alteradas, para serem deletadas no cloudinary
    const imagesToDelete: string[] = [];

    const cleanData = cleanObject(data);
    const cleanPet = cleanObject(currentPet);

    // verifica se há alguma alteração
    if (isEqual(cleanData, cleanPet)) {
      showSuccessNotification("Alterações salvas com sucesso!");
      setLoading(false);
      navigate("/minhas-doacoes");
      return;
    }

    // verifica se alterou a imagem principal
    if (!isEqual(cleanData.image, cleanPet.image)) {
      imagesToDelete.push(cleanPet.image);
    }

    // verifica se alterou as imagens adicionais
    if (!isEqual(cleanData.moreImages, cleanPet.moreImages)) {
      const moreImagesToDelete =
        cleanPet.moreImages?.filter(
          (item: string) => !cleanData.moreImages?.includes(item)
        ) || [];

      imagesToDelete.push(...moreImagesToDelete);
    }

    // upa as imagens
    if (imageData || moreImagesData.length > 0) {
      const result = await uploadImages(imageData, moreImagesData);

      if (!result) return;

      // atualiza o objeto com as novas urls
      const { image, moreImages } = result;

      if (imageData) {
        cleanData.image = image;
      }
      if (moreImagesData.length > 0) {
        cleanData.moreImages = moreImages;
      }
    }

    // monta um objeto somente com os campos que foram alterados
    const updatedPet = getUpdatedFields(cleanPet, cleanData);

    // atualiza no firestore
    const petRef = doc(db, "pets", data.id);
    await updateDoc(petRef, updatedPet);

    // atualiza o state local
    setAvailablePets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === data.id ? { ...pet, ...cleanData } : pet
      )
    );

    // deleta as imagens
    try {
      await Promise.all(imagesToDelete.map((image) => deleteImage(image)));
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
    }

    showSuccessNotification("Alterações salvas com sucesso!");
    setLoading(false);
    navigate("/minhas-doacoes");
  };

  // remove o pet e todos os dados relacionados
  const deletePet = async (
    petId: string,
    petImage: string | null,
    petMoreImages: string[] | undefined
  ) => {
    try {
      setLoading(true);
      const imagesToDelete: string[] = [];

      // remove o pet
      await deleteDoc(doc(db, "pets", petId));

      // remove as solicitações de adoção
      const q = query(
        collection(db, "adoptionRequests"),
        where("petId", "==", petId)
      );

      const querySnapshot = await getDocs(q);

      const deletionPromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, "adoptionRequests", document.id))
      );

      await Promise.all(deletionPromises);

      // remove as imagens
      if (petImage) {
        imagesToDelete.push(petImage);
      }

      if (petMoreImages && petMoreImages.length > 0) {
        imagesToDelete.push(...petMoreImages);
      }

      await Promise.all(imagesToDelete.map((image) => deleteImage(image)));

      // atualiza o state local
      setAvailablePets((prev) => prev.filter((pet) => pet.id !== petId));
    } catch {
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // lida com a adoção do pet, remove todos os dados relacionados a ele, e cria os docs de adoção e doação relacionados a ele
  const adoptedPet = async (
    checked: boolean,
    name: string,
    image: string,
    petName: string,
    petId: string,
    petMoreImages: string[] | undefined
  ) => {
    setError(null);
    setLoading(true);
    try {
      let adopterData;

      if (checked) {
        if (name.length < 4) {
          setError("Por favor, digite um nome de usuário válido.");
          setLoading(false);
          return;
        }

        if (name === username) {
          setError("Por favor, digite um nome de usuário válido.");
          setLoading(false);

          return;
        }

        // verifica se o usuário existe
        const usernameRef = doc(db, "usernames", name);
        const usernameSnapshot = await getDoc(usernameRef);

        if (!usernameSnapshot.exists()) {
          setError("Esse usuário não existe.");
          setLoading(false);

          return;
        } else {
          const userData = usernameSnapshot.data();
          adopterData = userData.adoptedPets || [];
        }
      }

      // imagem compactada
      const newImage = image.replace("w_600", "w_300");

      // monta o novo objeto a ser armazenado
      const newDonatedPet: IDonatedPet = {
        date: Timestamp.now(),
        name: petName,
        image: newImage,
      };

      await updateDoc(doc(db, "usernames", username!), {
        donatedPets: arrayUnion(newDonatedPet),
      });

      // atualiza o state local
      setDonatedPets((prev) => [...prev, newDonatedPet]);

      // se o pet foi adotado pela plataforma, adiciona ao histórico de doações do usuário que adotou
      if (checked) {
        // adiciona o pet nos dados do adotante
        await updateDoc(doc(db, "usernames", name), {
          adoptedPets: arrayUnion(newDonatedPet),
        });
      }

      // remove todos os dados do pet, exceto a imagem principal
      await deletePet(petId, null, petMoreImages);
    } catch (error) {
      console.log(error)
      setError("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // limpa os objetos antes de comparar
  const cleanObject = (obj: any) => {
    const cleanedObj: any = {};

    Object.entries(obj).forEach(([key, value]) => {
      if (key === "createdAt") {
        return;
      }

      if (
        value !== undefined &&
        value !== "" &&
        value !== null &&
        (typeof value !== "object" || (value && Object.keys(value).length > 0))
      ) {
        cleanedObj[key] = value;
      }
    });

    return cleanedObj;
  };

  // monta um novo objeto apenas com as propriedades que alteraram entre os objetos de parametro da função
  const getUpdatedFields = (oldData: any, newData: any) => {
    const updatedFields: any = {};

    const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

    allKeys.forEach((key) => {
      const oldValue = oldData[key];
      const newValue = newData[key];

      // Caso o campo não exista mais no novo dado, deve ser removido
      const fieldRemoved =
        !(key in newData) ||
        newValue === undefined ||
        newValue === null ||
        (typeof newValue === "string" && newValue.trim() === "");

      if (fieldRemoved) {
        if (key in oldData) {
          updatedFields[key] = deleteField();
        }
        return;
      }

      // Se valor foi alterado
      const valueChanged =
        JSON.stringify(oldValue) !== JSON.stringify(newValue);
      if (valueChanged) {
        updatedFields[key] = newValue;
      }
    });

    return updatedFields;
  };

  return {
    createPet,
    adoptedPet,
    editPet,
    deletePet,
    error,
    setError,
    loading,
  };
};
