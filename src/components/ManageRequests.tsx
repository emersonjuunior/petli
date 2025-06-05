import { useRef, useEffect, useState } from "react";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";
import noAvailablePets from "../assets/no-available-pets.json";
import Lottie from "lottie-react";

interface Props {
  setManageRequestsModal: React.Dispatch<React.SetStateAction<boolean>>;
  pendingRequests: number;
  petId: string;
  petGender: string;
  petName: string;
}

const ManageRequests = ({
  setManageRequestsModal,
  pendingRequests,
  petId,
  petGender,
  petName,
}: Props) => {
  const manageRequestsModalRef = useRef<HTMLDivElement>(null);
  const { getRequestsReceived, requestLoading, currentRequestsReceived } =
    useAdoptionRequest();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getRequestsReceived(petId);
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

  console.log(requestLoading);
  console.log(initialLoading);

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-bgGray w-full max-w-[750px] mx-2 md:mx-5 lg:mx-2 rounded-lg p-4 md:p-8 relative max-h-[500px] md:max-h-[750px] xl:max-h-[780px] overflow-y-auto min-h-[750px]"
        ref={manageRequestsModalRef}
      >
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setManageRequestsModal(false)}
        ></i>
        <h2 className="text-xl md:text-2xl font-medium max-w-8/10 mb-2">
          Gerenciar solicitações de adoção ✍️
        </h2>
        <p className="mb-2 md:mb-4 text-base md:text-[17px]">
          Veja e gerencie as solicitações de adoção recebidas para{" "}
          <span className="font-semibold">
            {petGender === "Macho" ? "o" : petGender === "Fêmea" ? "a" : "o(a)"}{" "}
            {petName}
          </span>
          . Você pode{" "}
          <span className="font-medium">
            aprovar ou recusar uma solicitação
          </span>
          .
        </p>
        <hr className="text-[#505050] mb-1 md:mb-3" />
        <section className="border-1 min-h-[500px] md:min-h-[500px] xl:min-h-[450px] max-h-[350px] md:max-h-[500px] xl:max-h-[500px] mb-1 md:mb-3">
          {initialLoading ||
            (requestLoading && (
              <div className="w-full min-h-[350px] md:min-h-[350px] xl:min-h-[450px] bg-[#404040] rounded-xl animate-pulse"></div>
            ))}
          {!requestLoading &&
            !initialLoading &&
            currentRequestsReceived.length === 0 && (
              <div className="flex justify-center items-center flex-col relative">
                <Lottie
                  animationData={noAvailablePets}
                  className="w-xs min-w-xs md:w-md md:min-w-md xl:w-lg xl:min-w-lg border-1 flex"
                />
                <p className="absolute bottom-2 md:bottom-5 text-base md:text-lg font-medium max-w-[200px] text-center">
                  Nenhuma solicitação por enquanto
                </p>
              </div>
            )}
          {!requestLoading &&
            !initialLoading &&
            currentRequestsReceived.length > 0 && (
              <>
                {currentRequestsReceived.map((request, index) => (
                  <article key={index}>{request.adoptionAnswers}
                  {pendingRequests}</article>
                ))}
              </>
            )}
        </section>
        <hr className="text-[#505050] mb-1 md:mb-2" />
      </div>
    </div>
  );
};

export default ManageRequests;
