import { useEffect, useRef } from "react";
import { IRequest } from "../interfaces/Request";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface Props {
  setRequestDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  request: IRequest;
  viewDetails: boolean;
}

const RequestDetailsModal = ({
  setRequestDetailsModal,
  request,
  viewDetails,
}: Props) => {
  const requestDetailsModalRef = useRef<HTMLDivElement>(null);
  const { showSuccessNotification } = useUserContext();

  const handleCopyUrl = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showSuccessNotification("Email copiado com sucesso! ✉️");
    });
  };

  const getStatusMessage = () => {
    switch (request.status) {
      case "Em análise":
        return "Sua solicitação está sendo avaliada pelo responsável do pet. Fique atento, você será notificado assim que houver uma resposta.";
      case "Aprovada":
        return (
          <div className="flex flex-col gap-3 md:gap-6">
            <p>
              Parabéns! Sua solicitação foi aprovada. Você pode entrar em
              contato clicando no botão abaixo, ou na página de perfil do{" "}
              <span className="font-semibold underline text-accentBlue">
                <Link to={`/pet/${request.petProfile}`}>
                  pet {request.petName}
                </Link>
              </span>
              , clicando em "Quero adotar".
            </p>
            {request.petContact!.includes("@") ? (
              <button
                className="bg-[#4285F4] hover:bg-[#3367D6] px-4 py-2 md:py-3 rounded-xl font-semibold text-base md:text-lg cursor-pointer duration-300"
                onClick={() => {
                  handleCopyUrl(request.petContact!);
                  setRequestDetailsModal(false);
                }}
              >
                <i className="fa-solid fa-envelope text-xl mr-1"></i> Entrar em
                contato
              </button>
            ) : (
              <a
                target="_blank"
                href={`https://wa.me/55${request.petContact!.replace(
                  /\D/g,
                  ""
                )}`}
                onClick={() => setRequestDetailsModal(false)}
              >
                <button className="bg-[#1EBE5D] hover:bg-[#25D366] px-4 py-2 md:py-3 rounded-xl w-full font-semibold text-base md:text-lg cursor-pointer duration-300">
                  <i className="fa-brands fa-whatsapp text-xl mr-1"></i> Entrar
                  em contato
                </button>
              </a>
            )}
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
        className="bg-bgGray w-full max-w-[750px] mx-2 md:mx-5 lg:mx-2 rounded-lg p-4 md:p-8 relative max-h-[550px] md:max-h-[750px] xl:max-h-[790px] flex flex-col"
        ref={requestDetailsModalRef}
      >
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setRequestDetailsModal(false)}
        ></i>
        <h2 className="text-xl md:text-2xl font-medium max-w-9/10 mb-3 md:mb-5">
          Solicitação de contato para adotar{" "}
          <span className="font-semibold">{request.petName}</span> ✍️
        </h2>
        <hr className="text-[#505050] mb-3 md:mb-5" />
        <div className="mb-3 md:mb-5">
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
          {getStatusMessage()}
        </div>
        <hr className="text-[#505050] mb-3 md:mb-5" />
        {viewDetails && (
          <>
            {" "}
            <article className="w-full border-1 border-[#444444] bg-linear-to-r from-[#383838] to-[#393939] rounded-xl shadow-lg p-5 mb-3 md:mb-5">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Sua solicitação de contato:
              </h3>
              <address className="not-italic mb-3">
                {request.location} -{" "}
                {request.date.toDate().toLocaleDateString("pt-br")}
              </address>
              <div className="mb-4 md:mb-5">
                <p className="md:text-lg mb-1">
                  Por que{" "}
                  <span className="font-medium">
                    você deseja adotar {request.petName}?
                  </span>
                </p>
                <p className="px-1 text-sm md:text-base italic">
                  - {request.text}
                </p>
              </div>
              <div className="mb-3">
                <p className="md:text-lg mb-1">{request.adoptionQuestions}</p>
                <p className="px-1 text-sm md:text-base italic">
                  - {request.adoptionAnswers}
                </p>
              </div>
            </article>
            <hr className="text-[#505050] mb-3 md:mb-5" />
          </>
        )}
        <button
          onClick={() => setRequestDetailsModal(false)}
          className="text-base md:text-lg font-semibold cursor-pointer hover:text-gray-100 duration-300 self-end"
        >
          Voltar
        </button>
      </div>
    </section>
  );
};

export default RequestDetailsModal;
