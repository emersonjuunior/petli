import { useEffect, useRef } from "react";
import { IRequest } from "../interfaces/Request";
import { Link } from "react-router-dom";

interface Props {
  setRequestDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  request: IRequest;
}

const RequestDetailsModal = ({ setRequestDetailsModal, request }: Props) => {
  const requestDetailsModalRef = useRef<HTMLDivElement>(null);

  const getStatusMessage = () => {
    switch (request.status) {
      case "Em análise":
        return "Sua solicitação está sendo avaliada pelo responsável do pet. Fique atento, você será notificado assim que houver uma resposta.";
      case "Aprovada":
        return (
          <div>
            <p>
              Parabéns! Sua solicitação foi aprovada. Você pode entrar em
              contato clicando no botão abaixo, ou na página de perfil do{" "}
              <span className="font-semibold underline text-accentBlue">
                <Link to={`/pet/${request.petProfile}`}>
                  pet {request.petName}
                </Link>
              </span>
              , clicando em "Quero adotar". 🐾
            </p>
            <button>Entrar em contato</button>
          </div>
        );
      case "Recusada":
        return "Infelizmente, sua solicitação foi recusada. Mas não desanime, há muitos outros pets esperando por um lar.";
      default:
        return "";
    }
  };

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        requestDetailsModalRef.current &&
        !requestDetailsModalRef.current.contains(event.target as Node)
      ) {
        setRequestDetailsModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setRequestDetailsModal]);

  return (
    <section className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-bgGray w-full max-w-[750px] mx-2 md:mx-5 lg:mx-2 rounded-lg p-4 md:p-8 relative max-h-[550px] md:max-h-[750px] xl:max-h-[790px]"
        ref={requestDetailsModalRef}
      >
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setRequestDetailsModal(false)}
        ></i>
        <h2 className="text-lg md:text-xl font-medium max-w-8/10 mb-2 md:mb-4">
          Solicitação de contato para adotar{" "}
          <span className="font-semibold">{request.petName}</span> ✍️
        </h2>
        <hr className="text-[#505050] mb-2 md:mb-4" />
        <div>
          <div>
            <h4
              className={`${
                request.status === "Em análise"
                  ? "bg-blue-700"
                  : request.status === "Aprovada"
                  ? "bg-green-700"
                  : "bg-red-800"
              } tracking-wider text-lg font-medium px-3 py-1 w-fit rounded-lg mb-1 md:mb-3`}
            >
              Status: <span className="tracking-normal">{request.status}</span>
            </h4>
            <p>{getStatusMessage()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestDetailsModal;
