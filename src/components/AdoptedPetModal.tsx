import { FormEvent, useEffect, useRef, useState } from "react";
import Checkbox from "./Checkbox";
import Error from "./Error";
import { usePets } from "../hooks/usePets";

interface Props {
  setAdoptedPetModal: React.Dispatch<React.SetStateAction<boolean>>;
  petGender: string;
  petName: string;
  petId: string;
  petImage: string;
  petMoreImages: string[] | undefined;
}

const AdoptedPetModal = ({
  setAdoptedPetModal,
  petGender,
  petName,
  petId,
  petImage,
  petMoreImages,
}: Props) => {
  const adoptedPetModalRef = useRef<HTMLDivElement>(null);
  const { adoptedPet, error, setError, loading } = usePets();
  const [checked, setChecked] = useState<boolean>(false);
  const [name, setName] = useState("");

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        adoptedPetModalRef.current &&
        !adoptedPetModalRef.current.contains(event.target as Node)
      ) {
        setAdoptedPetModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAdoptedPetModal]);

  // função de envio do formulario
  const handleAdoptedPet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await adoptedPet(checked, name, petImage, petName, petId, petMoreImages, petGender, setAdoptedPetModal);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-[#282828] w-full max-w-[560px] mx-1 rounded-lg rounded-b-none"
        ref={adoptedPetModalRef}
      >
        <div className="py-4 px-3 md:px-8 md:py-6 relative">
          <i
            className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
            onClick={() => setAdoptedPetModal(false)}
          ></i>
          <h2 className="text-xl md:text-2xl font-medium mb-4 max-w-8/10">
            Marcar como <span className="font-semibold">adotado</span>
          </h2>
          <p>
            Que ótima notícia,{" "}
            <span className="font-medium">
              {petGender === "Macho"
                ? "o"
                : petGender === "Fêmea"
                ? "a"
                : "o(a)"}{" "}
              {petName}
            </span>{" "}
            encontrou um novo lar{" "}
            <span className="font-medium">cheio de amor</span>! 🐾
          </p>
        </div>
        <hr className="text-[#505050]" />
        <form
          className="bg-bgGray rounded-lg rounded-t-none"
          onSubmit={handleAdoptedPet}
        >
          <div className="py-4 px-3 md:px-8 md:py-6 flex flex-col gap-2">
            <Checkbox
              title="A adoção foi feita por alguém aqui na plataforma?"
              text="Se você marcar essa opção, esse pet será vinculado ao perfil do adotante e ficará visível na lista de pets adotados dele. Se deixar desmarcado, nenhum usuário da plataforma será marcado como adotante desse pet."
              checked={checked}
              setChecked={setChecked}
            />
            <label>
              <input
                type="text"
                placeholder="Nome de usuário do adotante"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!checked}
                className={`${
                  checked ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                } mt-3 w-full border-2 h-[40px] rounded-lg px-3`}
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
              onClick={() => setAdoptedPetModal(false)}
            >
              Voltar
            </button>
            <button
              type="submit"
              className={`${
                loading
                  ? "bg-[#614cfcda] cursor-progress"
                  : "bg-[#614cfc] cursor-pointer"
              } font-medium sm:text-lg px-3 sm:px-8 h-[35px] sm:h-[45px] rounded-xl duration-200 hover:bg-[#614cfcda]`}
            >
              {loading ? "Aguarde..." : "Concluir"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptedPetModal;
