import { useRef, useEffect, useState } from "react";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";
import noAvailablePets from "../assets/no-available-pets.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

interface Props {
  setManageRequestsModal: React.Dispatch<React.SetStateAction<boolean>>;
  pendingRequests: number;
  petId: string;
  petGender: string;
  petName: string;
  adoptionQuestions: string;
}

const ManageRequests = ({
  setManageRequestsModal,
  pendingRequests,
  petId,
  petGender,
  petName,
  adoptionQuestions,
}: Props) => {
  const manageRequestsModalRef = useRef<HTMLDivElement>(null);
  const {
    getRequestsReceived,
    requestLoading,
    currentRequestsReceived,
    acceptOrRejectRequest,
    btnLoading,
  } = useAdoptionRequest();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getRequestsReceived(petId, pendingRequests);
      setInitialLoading(false);
    };

    fetchData();
  }, [petId]);

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        manageRequestsModalRef.current &&
        !manageRequestsModalRef.current.contains(event.target as Node)
      ) {
        setManageRequestsModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setManageRequestsModal]);

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-bgGray w-full max-w-[750px] mx-2 md:mx-5 lg:mx-2 rounded-lg p-4 md:p-8 relative max-h-[550px] md:max-h-[750px] xl:max-h-[790px]"
        ref={manageRequestsModalRef}
      >
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setManageRequestsModal(false)}
        ></i>
        <h2 className="text-lg md:text-2xl font-medium max-w-8/10 mb-2">
          Gerenciar solicitações de contato ✍️
        </h2>
        <p className="mb-2 md:mb-4 text-sm md:text-[17px]">
          Veja e gerencie as solicitações de contato recebidas para{" "}
          <span className="font-semibold">
            {petGender === "Macho" ? "o" : petGender === "Fêmea" ? "a" : "o(a)"}{" "}
            {petName}
          </span>
          . Ao aprovar, seu{" "}
          <span className="font-medium">
            contato ficará visível para o adotante
          </span>
          .
        </p>
        <hr className="text-[#505050] mb-2 md:mb-4" />
        <section className="flex flex-col gap-3 md:gap-4 max-h-[320px] md:max-h-[330px] xl:max-h-[520px] overflow-y-auto mb-2 md:mb-4">
          {(initialLoading || requestLoading) && (
            <div className="min-h-[268px] md:min-h-[300px] bg-[#404040] border-1 border-bgGray rounded-xl animate-pulse"></div>
          )}

          {!requestLoading &&
            !initialLoading &&
            currentRequestsReceived.length === 0 && (
              <div className="flex justify-center items-center flex-col relative">
                <Lottie
                  animationData={noAvailablePets}
                  className="w-[150px] min-w-[150px] md:w-[290px] md:min-w-[290px] xl:w-[360px] xl:min-w-[360px] flex items-center justify-center"
                />
                <p className="absolute bottom-0 md:bottom-3 xl:bottom-5 text-base md:text-xl font-medium max-w-[210px] text-center">
                  Nada por enquanto.
                </p>
              </div>
            )}
          {!requestLoading &&
            !initialLoading &&
            currentRequestsReceived.length > 0 && (
              <>
                {currentRequestsReceived.map((request, index) => (
                  <article
                    key={index}
                    className="w-full bg-[#303030] rounded-xl shadow-md p-5"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold underline mb-2">
                      <Link to={`/${request.interested}`}>
                        {request.interested}
                      </Link>
                    </h3>
                    <address className="not-italic mb-3">
                      {request.location} -{" "}
                      {request.date.toDate().toLocaleDateString("pt-br")}
                    </address>
                    <div className="mb-4 md:mb-5">
                      <p className="md:text-lg mb-1">
                        Por que{" "}
                        <span className="font-medium">
                          {request.interested} deseja adotar {""}
                          {petGender === "Macho"
                            ? "o"
                            : petGender === "Fêmea"
                            ? "a"
                            : "o(a)"}{" "}
                          {petName}
                        </span>
                        ?
                      </p>
                      <p className="px-1 text-sm md:text-base italic">
                        - {request.text}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="md:text-lg mb-1">{adoptionQuestions}</p>
                      <p className="px-1 text-sm md:text-base italic">
                        - {request.adoptionAnswers}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 w-full justify-end">
                      <button
                        disabled={btnLoading}
                        onClick={() => acceptOrRejectRequest(request, true)}
                        className={`${
                          btnLoading
                            ? "cursor-progress opacity-80"
                            : "cursor-pointer"
                        } py-[6px] px-3 md:px-5 md:text-lg font-medium rounded-lg bg-green-700 hover:bg-green-600 duration-300`}
                      >
                        Exibir Contato
                      </button>
                      <button
                        disabled={btnLoading}
                        onClick={() => acceptOrRejectRequest(request, false)}
                        className={`${
                          btnLoading
                            ? "cursor-progress opacity-80"
                            : "cursor-pointer"
                        } py-1 px-3 md:px-4 rounded-lg text-sm md:text-base font-medium bg-red-700 hover:bg-red-600 duration-300`}
                      >
                        Recusar
                      </button>
                    </div>
                  </article>
                ))}
              </>
            )}
        </section>
        <hr className="text-[#505050] mb-2 md:mb-4" />
        <div className="flex justify-end">
          <button
            onClick={() => setManageRequestsModal(false)}
            className="text-base md:text-lg font-semibold cursor-pointer hover:text-gray-100 duration-300"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;
