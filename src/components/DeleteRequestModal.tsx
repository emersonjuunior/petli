import { useEffect, useRef } from "react";
import Warning from "./Warning";
import { IRequest } from "../interfaces/Request";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";

interface Props {
  setDeleteRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentRequest: IRequest;
}

const DeleteRequestModal = ({
  setDeleteRequestModal,
  currentRequest,
}: Props) => {
  const deleteRequestModalRef = useRef<HTMLDivElement>(null);
  const { deleteRequest, loading } = useAdoptionRequest();

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deleteRequestModalRef.current &&
        !deleteRequestModalRef.current.contains(event.target as Node)
      ) {
        setDeleteRequestModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDeleteRequestModal]);

  const handleDeleteRequest = async () => {
    await deleteRequest(currentRequest);
    setDeleteRequestModal(false);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-[#282828] w-full max-w-[560px] mx-1 rounded-lg"
        ref={deleteRequestModalRef}
      >
        <div className="py-4 px-3 md:px-8 md:py-6 relative">
          <i
            className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
            onClick={() => setDeleteRequestModal(false)}
          ></i>
          <h2 className="text-lg md:text-xl font-medium mb-4 max-w-8/10">
            Remover{" "}
            <span className="font-semibold">solicitação de contato</span>?
          </h2>
          <p className="mb-3">
            Essa solicitação de contato será removida permanentemente, junto com
            todas os seus dados relacionados.
          </p>
          <Warning msg="Esta ação não pode ser desfeita. Tenha certeza antes de prosseguir." />
          <hr className="text-[#505050] my-4 md:my-5" />
          <div className="w-full flex justify-end gap-3 md:gap-4">
            <button
              onClick={() => setDeleteRequestModal(false)}
              className="cursor-pointer hover:text-gray-50 duration-300"
            >
              Voltar
            </button>
            <button
              onClick={handleDeleteRequest}
              className={`${
                loading
                  ? "cursor-progress bg-red-900"
                  : "cursor-pointer bg-red-800"
              } rounded-lg px-3 md:px-4 py-1 md:py-2 duration-300 hover:bg-red-900`}
            >
              Remover Solicitação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequestModal;
