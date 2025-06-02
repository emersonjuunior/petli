import { useRef, useEffect, useState, FormEvent } from "react";
import Warning from "./Warning";
import Error from "./Error";
import { useUserContext } from "../context/UserContext";
import { usePets } from "../hooks/usePets";

interface Props {
  setDeletePetModal: React.Dispatch<React.SetStateAction<boolean>>;
  petId: string;
  petName: string;
  petImage: string | null;
  petMoreImages: string[] | undefined;
}

const DeletePetModal = ({
  petName,
  petId,
  setDeletePetModal,
  petImage,
  petMoreImages,
}: Props) => {
  const { deletePet, loading, error, setError } = usePets();
  const { showSuccessNotification } = useUserContext();
  const deletePetModalRef = useRef<HTMLDivElement>(null);
  const [typePetName, setTypePetName] = useState("");

  // variável que checa se o usuário digitou o nome do pet
  const isActiveButton = typePetName.toLowerCase() === petName.toLowerCase();

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deletePetModalRef.current &&
        !deletePetModalRef.current.contains(event.target as Node)
      ) {
        setDeletePetModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDeletePetModal]);

  // função de remover o pet e todos os dados relacionados a ele
  const handleDeletePet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await deletePet(petId, petImage, petMoreImages);

    setDeletePetModal(false);
    showSuccessNotification("Pet removido com sucesso!");
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-[#282828] w-full max-w-[560px] mx-1 rounded-lg"
        ref={deletePetModalRef}
      >
        <div className="py-4 px-3 md:px-8 md:py-6 relative">
          <i
            className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
            onClick={() => setDeletePetModal(false)}
          ></i>
          <h2 className="text-xl md:text-2xl font-medium mb-4 max-w-8/10">
            Remover Pet <span className="font-semibold">{petName}</span>?
          </h2>
          <p className="mb-3">
            Este pet será removido permanentemente, junto com todas as suas
            informações, imagens e dados relacionados.
          </p>
          <Warning msg="Esta ação não pode ser desfeita. Tenha certeza antes de prosseguir." />
        </div>
        <hr className="text-[#505050]" />
        <form
          className="bg-bgGray rounded-lg rounded-t-none"
          onSubmit={handleDeletePet}
        >
          <div className="py-4 px-3 md:px-8 md:py-6 flex flex-col gap-2">
            <p>
              Digite o nome do pet{" "}
              <span className="font-semibold">{petName}</span> para continuar.
            </p>
            <label>
              <input
                type="text"
                className="w-full border-1 rounded-lg h-10 border-[#505050]"
                value={typePetName}
                maxLength={50}
                onChange={(e) => setTypePetName(e.target.value)}
              />
            </label>
          </div>
          <hr className="text-[#505050]" />
          {error && (
            <div className="px-4 my-2">
              <Error error={error} setError={setError} />
            </div>
          )}
          <div className="bg-[#282828] rounded-lg rounded-t-none flex gap-3 justify-end items-center py-4 px-3 md:px-8 md:py-6">
            <button
              className="cursor-pointer"
              onClick={() => setDeletePetModal(false)}
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={!isActiveButton}
              className={`text-lg font-medium py-2 px-4 rounded-lg duration-200 shadow-md
        ${
          isActiveButton
            ? "cursor-pointer hover:bg-red-800"
            : "cursor-not-allowed opacity-50"
        } ${loading ? "cursor-progress bg-red-800" : "bg-red-900"}`}
            >
              {loading ? "Removendo..." : "Remover Pet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeletePetModal;
