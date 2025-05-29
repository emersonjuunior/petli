import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAvailablePets } from "../hooks/useAvailablePets";
import { useNavigate } from "react-router-dom";
import DeletePetModal from "../components/DeletePetModal";
import { useState } from "react";

const MyDonations = () => {
  const { username } = useUserContext();
  const navigate = useNavigate();
  const { petLoading, profileAvailablePets: userAvailablePets } =
    useAvailablePets(username!);
  const [deletePetModal, setDeletePetModal] = useState(false);
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
    const pet = userAvailablePets.find((pet) => pet.id === id);

    // redireciona para a pagina de editar com os dados do pet
    navigate(`/editar/${id}`, {
      state: { pet },
    });
  };

  const handleDeletePet = (
    id: string,
    name: string,
    petImage: string,
    petMoreImages: string[] | undefined
  ) => {
    setDeletePetModal(true);
    setCurrentPetId(id);
    setCurrentPetName(name);
    setCurrentPetImage(petImage);
    setCurrentPetMoreImages(petMoreImages);
  };

  return (
    <main>
      <section>
        {userAvailablePets.map((pet) => (
          <div key={pet.id}>
            <img
              src={pet.image}
              alt={pet.name}
              className="size-40 object-cover"
            />
            <div className="flex flex-col gap-3 items-start">
              {" "}
              <p>{pet.name}</p>
              <button
                className="cursor-pointer"
                onClick={() => handleEditPet(pet.id)}
              >
                Editar
              </button>
              <button
                className="cursor-pointer"
                onClick={() =>
                  handleDeletePet(pet.id, pet.name, pet.image, pet.moreImages)
                }
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </section>
      {deletePetModal && (
        <DeletePetModal
          petName={currentPetName!}
          petId={currentPetId!}
          setDeletePetModal={setDeletePetModal}
          petImage={currentPetImage}
          petMoreImages={currentPetMoreImages}
        />
      )}
    </main>
  );
};

export default MyDonations;
