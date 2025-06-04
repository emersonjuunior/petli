import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAvailablePets } from "../hooks/useAvailablePets";
import { useNavigate, Link } from "react-router-dom";
import DeletePetModal from "../components/DeletePetModal";
import { useState } from "react";
import AdoptedPetModal from "../components/AdoptedPetModal";
import { Helmet } from "react-helmet";
import NoPets from "../components/NoPets";
import PetSummary from "../components/PetSummary";

const MyDonations = () => {
  const { username, availablePets, donatedPets } = useUserContext();
  const navigate = useNavigate();
  const { petLoading } = useAvailablePets(username!);
  const [active, setActive] = useState(1);
  const [deletePetModal, setDeletePetModal] = useState(false);
  const [adoptedPetModal, setAdoptedPetModal] = useState(false);
  const [currentPetGender, setCurrentPetGender] = useState<string | null>(null);
  const [currentPetId, setCurrentPetId] = useState<string | null>(null);
  const [currentPetName, setCurrentPetName] = useState<string | null>(null);
  const [currentPetImage, setCurrentPetImage] = useState<string | null>(null);
  const [currentPetMoreImages, setCurrentPetMoreImages] = useState<
    string[] | undefined
  >([]);

  console.log(availablePets);
  console.log(petLoading);

  if (petLoading) {
    return <Loading />;
  }

  const handleEditPet = (id: string) => {
    const pet = availablePets.find((pet) => pet.id === id);

    // redireciona para a pagina de editar com os dados do pet
    navigate(`/editar/${id}`, {
      state: { pet },
    });
  };

  const handleSelectPet = (
    id: string,
    name: string,
    petImage: string,
    petGender: string,
    petMoreImages: string[] | undefined
  ) => {
    setCurrentPetId(id);
    setCurrentPetName(name);
    setCurrentPetImage(petImage);
    setCurrentPetGender(petGender);
    setCurrentPetMoreImages(petMoreImages);
  };

  return (
    <>
      <Helmet>
        <title>Minhas Doações | Petli</title>
        <meta
          name="description"
          content="Acompanhe e gerencie os seus pets disponíveis para adoção. Edite informações, visualize solicitações de adoção, marque um pet como adotado ou remova-o da lista de disponíveis."
        />
      </Helmet>
      <main className="pt-4 px-2 md:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="font-semibold text-3xl md:text-4xl mb-6 md:mb-10 after:content-[''] after:block after:h-[2px] after:w-20 after:bg-primaryRed">
            Minhas Doações
          </h1>
          <div className="flex overflow-x-scroll md:overflow-x-visible whitespace-nowrap relative gap-14 md:gap-20 border-[#505050] w-full border-b-2 mb-10 md:mb-14 pb-4 text-lg font-medium">
            <h2
              onClick={() => setActive(1)}
              className={`${
                active === 1
                  ? "relative after:absolute after:content-[''] after:bottom-[-16px] md:after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-gray-300"
                  : "text-gray-200 opacity-50"
              } cursor-pointer duration-300 hover:opacity-100`}
            >
              disponíveis para doação
            </h2>
            <h2
              onClick={() => setActive(2)}
              className={`${
                active === 2
                  ? "relative after:absolute after:content-[''] after:bottom-[-16px] md:after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-gray-300"
                  : "text-gray-200 opacity-50"
              } cursor-pointer duration-300 hover:opacity-100`}
            >
              pets já doados
            </h2>
          </div>
          {active === 1 && (
            <>
              {availablePets && availablePets.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availablePets.map((pet) => (
                    <div key={pet.id}>
                      <article className="group w-[320px] md:w-[340px] mx-auto rounded-xl rounded-b-none border-1 border-bgGray bg-[#292929] border-b-primaryRed">
                        <Link to={`/pet/${pet.id}`} className="relative">
                          <div className="absolute opacity-0 group-hover:opacity-100 duration-300 font-semibold text-xl group-hover:bg-bgBlack/70 w-full h-full flex items-center justify-center">
                            Ver perfil
                          </div>
                          <img
                            src={pet.image}
                            alt={pet.name}
                            loading="lazy"
                            className="w-full min-h-[210px] max-h-[210px] object-cover rounded-3xl p-3 pb-0 hover:brightness-110 duration-300"
                          />
                        </Link>
                        <div className="flex flex-col gap-4 items-start px-4 mb-4">
                          <h3 className="pet-card-title text-2xl font-bold bg-primaryRed px-5 py-2 w-fit min-w-1/2 group-hover:min-w-[62%] duration-300 text-center mx-auto md:mb-1 truncate max-w-9/10">
                            {pet.name}
                          </h3>
                          {pet.allowContact ? (
                            <div className="h-[35px] md:h-[40px] w-full flex justify-center items-center bg-bgGray hover:bg-[#373737] px-4 py-2 rounded-xl font-medium duration-300">
                              <p>
                                Contato visível{" "}
                                <i className="fa-solid fa-check ml-1"></i>
                              </p>
                            </div>
                          ) : (
                            <button className="h-[35px] md:h-[40px] w-full  flex justify-center items-center gap-4 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300">
                              Solicitações de adoção
                              <span className="min-w-[22px] h-[22px] flex items-center justify-center bg-[#f04747] text-white text-sm font-semibold rounded-full">
                                {pet.pendingRequests}
                              </span>
                            </button>
                          )}
                          <button
                            onClick={() => handleEditPet(pet.id)}
                            className="w-full h-[35px] md:h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                          >
                            Editar <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="w-full h-[35px] md:h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                            onClick={() => {
                              handleSelectPet(
                                pet.id,
                                pet.name,
                                pet.image,
                                pet.gender,
                                pet.moreImages
                              );
                              setAdoptedPetModal(true);
                            }}
                          >
                            Marcar como Adotado{" "}
                            <i className="fa-solid fa-paw"></i>
                          </button>
                          <button
                            className="w-full h-[35px] md:h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                            onClick={() => {
                              handleSelectPet(
                                pet.id,
                                pet.name,
                                pet.image,
                                pet.gender,
                                pet.moreImages
                              );
                              setDeletePetModal(true);
                            }}
                          >
                            Remover <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
                  <div
                    className={`hidden w-[320px] md:w-[340px] mx-auto items-center justify-center ${
                      availablePets.length % 2 != 0 ? "md:flex" : ""
                    } ${
                      availablePets.length % 3 != 0 ? "lg:flex" : "lg:hidden"
                    }`}
                  >
                    <Link to="/novo-pet">
                      <div className="flex items-center justify-center size-40 rounded-full duration-300 hover:bg-[#292929]/80 bg-[#292929]/50 border-bgGray border-1">
                        <i className="fa-solid fa-plus text-6xl"></i>
                      </div>
                    </Link>
                  </div>
                </section>
              )}
              {!petLoading && availablePets.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <NoPets text="Nada por enquanto." />
                  <Link to="/novo-pet">
                    <button
                      type="submit"
                      className="text-lg font-medium py-2 rounded-lg w-[310px] duration-300 hover:bg-rose-700 shadow-md mb-3 bg-primaryRed cursor-pointer"
                    >
                      Adicionar novo pet
                    </button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          {active === 2 && (
            <>
              {donatedPets.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donatedPets.map((pet, index) => (
                    <div key={index} className=" w-full flex justify-center">
                      {" "}
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
                  <Link to="/novo-pet">
                    {availablePets.length === 0 && (
                      <button
                        type="submit"
                        className="text-lg font-medium py-2 rounded-lg w-[310px] duration-300 hover:bg-rose-700 shadow-md mb-3 bg-primaryRed cursor-pointer"
                      >
                        Adicionar novo pet
                      </button>
                    )}
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
        {deletePetModal && (
          <DeletePetModal
            petName={currentPetName!}
            petId={currentPetId!}
            setDeletePetModal={setDeletePetModal}
            petImage={currentPetImage}
            petMoreImages={currentPetMoreImages}
          />
        )}
        {adoptedPetModal && (
          <AdoptedPetModal
            setAdoptedPetModal={setAdoptedPetModal}
            petName={currentPetName!}
            petId={currentPetId!}
            petGender={currentPetGender!}
            petImage={currentPetImage!}
            petMoreImages={currentPetMoreImages}
          />
        )}
      </main>
    </>
  );
};

export default MyDonations;
