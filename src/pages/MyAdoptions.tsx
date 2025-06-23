import DeleteRequestModal from "../components/DeleteRequestModal";
import Loading from "../components/Loading";
import NoPets from "../components/NoPets";
import PetSummary from "../components/PetSummary";
import { useUserContext } from "../context/UserContext";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { IRequest } from "../interfaces/Request";
import RequestDetailsModal from "../components/RequestDetailsModal";

const MyAdoptions = () => {
  const { requestsSent, adoptedPets } = useUserContext();
  const { getRequestsSent, requestLoading } = useAdoptionRequest();
  const [active, setActive] = useState(1);
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [filteredRequests, setFilteredRequests] = useState(requestsSent);
  const [deleteRequestModal, setDeleteRequestModal] = useState(false);
  const [requestDetailsModal, setRequestDetailsModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest | null>(null);
  const [viewDetails, setViewDetails] = useState(false);

  useEffect(() => {
    getRequestsSent();
  }, []);

  useEffect(() => {
    if (!requestsSent) return;

    const filtered =
      statusFilter === "Todas"
        ? requestsSent
        : requestsSent.filter((r) => r.status === statusFilter);

    setFilteredRequests(filtered);
  }, [requestsSent, statusFilter]);

  if (requestLoading) {
    return <Loading />;
  }

  const handleDeleteRequest = (request: IRequest) => {
    setDeleteRequestModal(true);
    setCurrentRequest(request);
  };

  const handleRequestDetails = (request: IRequest, status?: boolean) => {
    setRequestDetailsModal(true);
    setCurrentRequest(request);

    // mostra os detalhes da solicitação
    if (status) {
      setViewDetails(true);
    } else {
      setViewDetails(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Minhas Adoções | Petli</title>
        <meta
          name="description"
          content="Acompanhe e gerencie as suas solicitações de contato, e veja os pets que você já deu um lar."
        />
      </Helmet>
      <main className="pt-4 px-2 md:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="font-semibold text-3xl md:text-4xl mb-6 md:mb-10 after:content-[''] after:block after:h-[2px] after:w-20 after:bg-primaryRed">
            Minhas Adoções
          </h1>
          <nav className="flex overflow-x-scroll md:overflow-x-visible whitespace-nowrap relative gap-14 md:gap-20 border-[#505050] w-full border-b-2 mb-10 md:mb-14 pb-4 text-lg font-medium">
            <h2
              onClick={() => setActive(1)}
              className={`${
                active === 1
                  ? "relative after:absolute after:content-[''] after:bottom-[-16px] md:after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-gray-300"
                  : "text-gray-200 opacity-50"
              } cursor-pointer duration-300 hover:opacity-100`}
            >
              solicitações de contato
            </h2>
            <h2
              onClick={() => setActive(2)}
              className={`${
                active === 2
                  ? "relative after:absolute after:content-[''] after:bottom-[-16px] md:after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-gray-300"
                  : "text-gray-200 opacity-50"
              } cursor-pointer duration-300 hover:opacity-100`}
            >
              pets já adotados
            </h2>
          </nav>
          {active === 1 && (
            <>
              <nav className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-3 md:mb-5 px-2 md:px-0">
                <h3 className="text-lg md:text-xl font-medium">
                  <i className="fa-solid fa-filter"></i> Filtrar solicitações:
                </h3>
                <select
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="md:text-[17px] border-2 border-gray-400 px-4 py-2 md:py-1 rounded-lg"
                >
                  <option value="Todas">Todas</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Aprovada">Aprovadas</option>
                  <option value="Recusada">Recusadas</option>
                </select>
              </nav>
              {filteredRequests.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRequests.map((request) => (
                    <div key={request.petProfile}>
                      <article className="shadow-lg group w-[320px] md:w-[340px] mx-auto rounded-xl rounded-b-none border-1 border-bgGray bg-[#292929] border-b-primaryRed">
                        <Link
                          to={`/pet/${request.petProfile}`}
                          className="relative"
                        >
                          <div className="absolute md:opacity-0 bg-bgBlack/70 md:bg-transparent group-hover:opacity-100 duration-300 font-semibold text-xl group-hover:bg-bgBlack/70 w-full h-full flex items-center justify-center">
                            Ver perfil
                          </div>
                          <img
                            src={request.petImage}
                            alt={request.petName}
                            loading="lazy"
                            className="w-full min-h-[210px] max-h-[210px] object-cover rounded-3xl p-3 pb-0 hover:brightness-110 duration-300"
                          />
                        </Link>

                        <div className="flex flex-col gap-4 items-start px-4 mb-4">
                          <h3 className="pet-card-title text-2xl font-bold bg-primaryRed px-5 py-2 w-fit min-w-1/2 group-hover:min-w-[62%] duration-300 text-center mx-auto md:mb-1 truncate max-w-9/10">
                            {request.petName}
                          </h3>

                          <button
                            onClick={() => handleRequestDetails(request)}
                            className="w-full h-[35px] md:h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                          >
                            <p className="flex items-center gap-2">
                              Status:
                              {request.status === "Em análise" && (
                                <span className="flex items-center text-blue-300 font-semibold">
                                  <span className="underline">Em análise</span>{" "}
                                  <i className="fa-solid fa-spinner ml-1 no-underline"></i>
                                </span>
                              )}
                              {request.status === "Aprovada" && (
                                <span className="flex items-center text-green-300 font-semibold">
                                  <span className="underline">Aprovada</span>{" "}
                                  <i className="fa-solid fa-check ml-1 no-underline"></i>
                                </span>
                              )}
                              {request.status === "Recusada" && (
                                <span className="flex items-center text-red-300 font-semibold">
                                  <span className="underline">Recusada</span>{" "}
                                  <i className="fa-solid fa-xmark ml-1 no-underline"></i>
                                </span>
                              )}
                            </p>
                          </button>
                          <button
                            onClick={() => handleRequestDetails(request, true)}
                            className="w-full h-[35px] md:h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                          >
                            Ver detalhes <i className="fa-solid fa-paw"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(request)}
                            className="w-full h-[35px] md:h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                          >
                            Remover solicitação
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
                </section>
              ) : filteredRequests.length === 0 && !requestLoading ? (
                <div>
                  {" "}
                  <NoPets text="Nada por enquanto." />
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          {active === 2 && (
            <>
              {adoptedPets.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adoptedPets.map((pet, index) => (
                    <div key={index} className=" w-full flex justify-center">
                      <PetSummary
                        image={pet.image}
                        date={pet.date}
                        name={pet.name}
                      />
                    </div>
                  ))}
                </section>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <NoPets text="Nada por enquanto." />
                </div>
              )}
            </>
          )}
        </div>
        {deleteRequestModal && (
          <DeleteRequestModal
            currentRequest={currentRequest!}
            setDeleteRequestModal={setDeleteRequestModal}
          />
        )}
        {requestDetailsModal && (
          <RequestDetailsModal
            setRequestDetailsModal={setRequestDetailsModal}
            request={currentRequest!}
            viewDetails={viewDetails}
          />
        )}
      </main>
    </>
  );
};

export default MyAdoptions;
