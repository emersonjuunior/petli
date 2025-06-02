import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAvailablePets } from "../hooks/useAvailablePets";
import { useNavigate } from "react-router-dom";
import DeletePetModal from "../components/DeletePetModal";
import { useState } from "react";
import AdoptedPetModal from "../components/AdoptedPetModal";

const MyDonations = () => {
  const { username, availablePets } = useUserContext();
  const navigate = useNavigate();
  const { petLoading } = useAvailablePets(username!);
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
    <main>
      <section>
        {availablePets.map((pet) => (
          <div key={pet.id}>
            <img
              src={pet.image}
              alt={pet.name}
              className="size-40 object-cover"
            />
            <div className="flex flex-col gap-3 items-start">
              {" "}
              <p>{pet.name}</p>
              <p>{pet.pendingRequests}</p>
              <button
                className="cursor-pointer"
                onClick={() => handleEditPet(pet.id)}
              >
                Editar
              </button>
              <button
                className="cursor-pointer"
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
                Marcar como Adotado
              </button>
              <button
                className="cursor-pointer"
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
  );
};

export default MyDonations;
