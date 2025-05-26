import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAvailablePets } from "../hooks/useAvailablePets";
import { useNavigate } from "react-router-dom";

const MyDonations = () => {
  const { username } = useUserContext();
  const navigate = useNavigate();
  const { petLoading, profileAvailablePets: userAvailablePets } =
    useAvailablePets(username!);

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
            <p>{pet.name}</p>
            <button
              className="cursor-pointer"
              onClick={() => handleEditPet(pet.id)}
            >
              Editar
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyDonations;
