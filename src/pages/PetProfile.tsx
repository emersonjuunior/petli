import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AdoptModal from "../components/AdoptModal";
import AdoptionRequest from "../components/AdoptionRequest";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";
import { Helmet } from "react-helmet";

const PetProfile = () => {
  const navigate = useNavigate();
  const { checkAdoptionRequest, requestLoading } = useAdoptionRequest();
  const [imgLoad, setImgLoad] = useState(true);
  const { petId } = useParams();
  const { pet, loading } = useGetProfile("pets", petId!);
  const [viewImage, setViewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [adoptModal, setAdoptModal] = useState(false);
  const location = useLocation();
  const { user, showSuccessNotification, requestsAlreadySent, username } =
    useUserContext();

  useEffect(() => {
    if (pet) {
      checkAdoptionRequest(pet.id, pet.allowContact, pet.owner);
    }
  }, [pet]);

  if (loading || requestLoading) {
    return <Loading />;
  }

  if (pet === null) {
    return <Navigate to="*" />;
  }

  const handleViewImage = (value: string) => {
    setImageUrl(value);
    setViewImage(true);
  };

  // copia a url da pagina
  const handleCopyUrl = (text: string) => {
    const fullUrl = `${window.location.origin}${location.pathname}${location.search}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      showSuccessNotification(text);
    });
  };

  // lida com a logica de clicar no botao de adotar
  const handleAdopt = () => {
    setAdoptModal(true);

    // verifica se o usuário logado pode ver o contato pra adoção
    if (pet.allowedAdopters?.includes(username!)) {
      return;
    }

    if (requestsAlreadySent.includes(pet.id)) {
      navigate("/minhas-adocoes");
    }
  };

  return (
    <>
      <Helmet>
        <title>{pet.name} | Petli</title>
        <meta
          name="description"
          content={`Conheça ${pet.name}, um ${pet.species} que está em busca de um novo lar em ${pet.city}, ${pet.state}.`}
        />
      </Helmet>
      <main className="w-full mb-12 md:mb-16">
        <div className="w-full max-w-7xl mx-auto px-2 md:px-4">
          <section className="flex flex-col gap-5 md:flex-row max-w-full items-center px-4 py-2 md:px-2">
            {imgLoad && (
              <div className="flex-1 min-w-4/10 w-full max-w-[360px] md:max-w-1/2 min-h-[360px] max-h-[360px] md:max-h-[500px] md:min-h-[400px] lg:min-h-[500px] bg-bgGray rounded-4xl animate-pulse"></div>
            )}
            <div
              className={`${
                imgLoad ? "hidden" : ""
              } flex-1 min-w-4/10 w-full max-w-[360px] md:max-w-full min-h-[360px] max-h-[360px] md:max-h-[500px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden flex items-center justify-center rounded-4xl`}
            >
              <img
                src={pet.image}
                alt={`Foto do Pet ${pet.name}`}
                onLoad={() => setImgLoad(false)}
                className="rounded-4xl object-cover min-w-full hover:brightness-115 cursor-pointer duration-300"
                onClick={() => handleViewImage(pet.image)}
              />
            </div>

            <div className="flex-1 flex items-center md:px-10 lg:px-14 h-[500px] min-h-fit w-full relative pb-14 md:pb-0 truncate">
              <div className="flex flex-col w-full justify-center h-fit">
                <h1 className="font-medium text-3xl md:text-4xl lg:text-6xl mb-4 min-h-fit">
                  {pet.name}
                </h1>
                <p className="text-xl mb-4">
                  <i className="fa-solid fa-map-pin text-[#bebaba] mr-1"></i>{" "}
                  {pet.city}, {pet.state}
                </p>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center gap-7 md:gap-20 lg:gap-30 text-xl">
                    <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                      Espécie
                    </p>
                    <span className="text-lg lg:text-xl">{pet.species}</span>
                  </div>
                  <div className="flex items-center gap-7 md:gap-20 lg:gap-30 text-xl">
                    <p className="bg-primaryRed min-w-[100px] text-center rounded-lg py-1">
                      Raça
                    </p>
                    <span className="text-lg lg:text-xl truncate min-h-fit">
                      {pet.breed}
                    </span>
                  </div>
                  <div className="flex items-center gap-7 md:gap-20 lg:gap-30 text-xl">
                    <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                      Gênero
                    </p>
                    <span className="text-lg lg:text-xl">{pet.gender}</span>
                  </div>
                  <div className="flex items-center gap-7 md:gap-20 lg:gap-30 text-xl">
                    <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                      Idade
                    </p>
                    <span className="text-lg lg:text-xl">{pet.age}</span>
                  </div>
                  <div className="flex items-center gap-7 md:gap-20 lg:gap-30 text-xl">
                    <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                      Estatura
                    </p>
                    <span className="text-lg lg:text-xl">{pet.size}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 text-lg flex gap-2">
                  {" "}
                  <p className="font-medium">Responsável: </p>
                  <Link to={`/${pet.owner}`}>
                    <span className="font-light underline">{pet.owner}</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <hr className="text-[#404040] my-8" />
          <div className="w-full flex flex-col gap-10">
            <section className="w-full border-2 border-[#404040] rounded-xl px-3 py-5 md:px-16 md:py-8 lg:px-20 lg:py-10 flex flex-col gap-5 shadow-md relative">
              <h2 className="text-xl md:text-2xl font-medium mb-2 absolute -top-4 md:left-14 lg:left-18 px-2 bg-bgBlack">
                Cuidados e Saúde 🩺
              </h2>
              <div className="flex flex-col md:flex-row gap-5 md:gap-2">
                <div className="w-full md:w-1/2 flex flex-col gap-1 mt-2 md:mt-0">
                  <h3 className="text-lg font-medium">
                    O pet já tomou alguma vacina?
                  </h3>
                  <p className="break-words font-light">
                    {pet.vaccinated ? pet.vaccinated : "Nenhuma por enquanto."}
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-1">
                  <h3 className="text-lg font-medium">
                    Necessita de cuidados especiais?
                  </h3>
                  <p className="break-words font-light">
                    {pet.specialCare ? pet.specialCare : "Não necessita."}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 w-1/2">
                  <h3 className="text-lg font-medium ">Castrado?</h3>
                  <p className="font-light">{pet.neutered ? "Sim" : "Não"}</p>
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <h3 className="text-lg font-medium">Vermifugado?</h3>
                  <p className="font-light">{pet.dewormed ? "Sim" : "Não"}</p>
                </div>
              </div>
            </section>
            <section className="w-full border-2 border-[#404040] rounded-xl px-3 py-5 md:px-16 md:py-8 lg:px-20 lg:py-10 flex flex-col gap-5 shadow-md relative">
              <h2 className="text-xl md:text-2xl font-medium mb-2 absolute -top-4 md:left-14 lg:left-18 px-2 bg-bgBlack">
                Personalidade 🐾
              </h2>
              <div className="flex flex-col md:flex-row gap-5 md:gap-2">
                <div className="flex flex-col gap-1 w-full md:w-1/2 mt-2 md:mt-0">
                  <h3 className="text-lg font-medium">
                    Mais detalhes sobre {pet.name}:
                  </h3>
                  <p className="break-words font-light">
                    {pet.description ? pet.description : "Nada informado."}
                  </p>
                </div>
                <div className="flex md:flex-col gap-1 md:gap-5 w-full md:w-1/2">
                  <div className="flex flex-col gap-1 w-1/2 md:w-full">
                    <h3 className="text-lg font-medium">
                      Se dá bem com outros animais?
                    </h3>
                    <p className="font-light">
                      {pet.goodWithOtherAnimals ? "Sim" : "Não"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 w-1/2 md:w-full">
                    <h3 className="text-lg font-medium">
                      Se dá bem com crianças?
                    </h3>
                    <p className="font-light">
                      {pet.goodWithChildren ? "Sim" : "Não"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <hr className="text-[#404040] mb-8" />
          </div>
          {pet.moreImages && (
            <section className="w-full">
              <h2 className="text-xl md:text-2xl font-medium mb-4">
                Mais imagens de {pet.name}
              </h2>
              <div className="grid gap-5 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {pet.moreImages.map((image, index) => (
                  <div
                    className="flex-1 min-h-[400px] max-h-[400px] min-w-[300px] max-w-[500px] overflow-hidden flex items-center justify-center rounded-xl shadow-md bg-[#282828]"
                    key={index}
                  >
                    <img
                      src={image}
                      loading="lazy"
                      alt={`Imagens adicionais do pet ${pet.name}`}
                      className="object-cover hover:brightness-115 cursor-pointer duration-300"
                      onClick={() => handleViewImage(image)}
                    />
                  </div>
                ))}
              </div>
              <hr className="text-[#404040] my-8" />
            </section>
          )}
          <div className="w-full flex flex-col gap-3 justify-center items-center">
            {user && pet.owner === username ? (
              <Link to="/minhas-doacoes">
                <button className="font-bold text-lg px-5 py-3 bg-primaryRed rounded-lg cursor-pointer hover:bg-rose-700 duration-300">
                  Gerenciar adoção <i className="fa-solid fa-paw ml-1"></i>
                </button>
              </Link>
            ) : user ? (
              <button
                className="w-[290px] text-[21px] font-bold py-3 bg-primaryRed rounded-lg cursor-pointer hover:bg-rose-700 duration-300"
                onClick={handleAdopt}
              >
                {requestsAlreadySent.includes(pet.id) &&
                !pet.allowedAdopters?.includes(username!)
                  ? "Acompanhar adoção"
                  : "Quero adotar"}
                <i className="fa-solid fa-paw ml-1"></i>
              </button>
            ) : (
              <Link to="/cadastro">
                <button className="font-bold text-lg px-5 py-3 bg-primaryRed rounded-lg cursor-pointer hover:bg-rose-700 duration-300">
                  Cadastre-se para adotar{" "}
                  <i className="fa-solid fa-paw ml-1"></i>
                </button>
              </Link>
            )}

            <button
              className="font-medium text-lg w-[200px] py-2 rounded-lg cursor-pointer hover:text-gray-200 duration-300"
              onClick={() =>
                handleCopyUrl("Url copiada para a área de transferência!")
              }
            >
              Compartilhar <i className="fa-solid fa-share-nodes ml-1"></i>
            </button>
          </div>
        </div>
        {viewImage && (
          <ViewImage
            image={imageUrl}
            name={pet.name}
            setViewImage={setViewImage}
          />
        )}
        {adoptModal &&
          (pet.allowContact || pet.allowedAdopters?.includes(username!)) && (
            <AdoptModal
              contact={pet.contact}
              setAdoptModal={setAdoptModal}
              species={pet.species}
            />
          )}
        {adoptModal &&
          !pet.allowContact &&
          !requestsAlreadySent.includes(pet.id) &&
          !pet.allowedAdopters?.includes(username!) && (
            <AdoptionRequest
              petId={pet.id}
              setAdoptModal={setAdoptModal}
              name={pet.name}
              gender={pet.gender}
              owner={pet.owner}
              species={pet.species}
              petImage={pet.image}
              adoptionQuestions={pet.adoptionQuestions!}
            />
          )}
      </main>
    </>
  );
};

export default PetProfile;
