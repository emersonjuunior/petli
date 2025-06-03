import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAvailablePets } from "../hooks/useAvailablePets";
import { useNavigate, Link } from "react-router-dom";
import DeletePetModal from "../components/DeletePetModal";
import { useState } from "react";
import AdoptedPetModal from "../components/AdoptedPetModal";
import { Helmet } from "react-helmet";

const MyDonations = () => {
  const { username, availablePets } = useUserContext();
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
      <main className="pt-4">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="font-semibold text-2xl md:text-4xl mb-10 after:content-[''] after:block after:h-[2px] after:w-20 after:bg-primaryRed">
            Minhas Doações
          </h1>
          <div className="flex relative gap-20 border-[#505050] w-full border-b-2 mb-14 pb-4 text-lg font-medium">
            <h2
              onClick={() => setActive(1)}
              className={`${
                active === 1
                  ? "relative after:absolute after:content-[''] after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-gray-300"
                  : "text-gray-200 opacity-60"
              } cursor-pointer duration-300 hover:opacity-100`}
            >
              disponíveis para doação
            </h2>
            <h2
              onClick={() => setActive(2)}
              className={`${
                active === 2
                  ? "relative after:absolute after:content-[''] after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-gray-300"
                  : "text-gray-200 opacity-60"
              } cursor-pointer duration-300 hover:opacity-100`}
            >
              pets já doados
            </h2>
          </div>
          <section className="grid grid-cols-3 gap-5">
            {availablePets.map((pet) => (
              <div key={pet.id}>
                <article className="group w-[340px] mx-auto rounded-xl rounded-b-none border-1 border-bgGray bg-[#292929] border-b-primaryRed">
                  <Link to={`/pet/${pet.id}`}>
                    {" "}
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-[210px] object-cover rounded-3xl p-3 pb-0 hover:brightness-110 duration-300"
                    />
                  </Link>
                  <div className="flex flex-col gap-4 items-start px-4 mb-4">
                    <h3 className="pet-card-title text-2xl font-bold bg-primaryRed px-5 py-2 w-fit min-w-1/2 group-hover:min-w-[62%] duration-300 text-center mx-auto mb-1 truncate max-w-9/10">
                      {pet.name}
                    </h3>
                    {pet.allowContact ? (
                      <div className="w-full h-[40px] flex justify-center items-center bg-bgGray hover:bg-[#373737] px-4 py-2 rounded-xl font-medium duration-300">
                        <p>
                          Contato visível{" "}
                          <i className="fa-solid fa-check ml-1"></i>
                        </p>
                      </div>
                    ) : (
                      <button className="w-full h-[40px] flex justify-center items-center gap-4 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300">
                        Solicitações de adoção
                        <span className="min-w-[22px] h-[22px] flex items-center justify-center bg-[#f04747] text-white text-sm font-semibold rounded-full">
                          {pet.pendingRequests}
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => handleEditPet(pet.id)}
                      className="w-full h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
                    >
                      Editar <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="w-full h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
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
                      Marcar como Adotado <i className="fa-solid fa-paw"></i>
                    </button>
                    <button
                      className="w-full h-[40px] flex justify-center items-center gap-2 bg-bgGray hover:bg-[#373737] cursor-pointer rounded-xl font-medium duration-300"
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
          </section>
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
