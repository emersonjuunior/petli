import { useUserContext } from "../context/UserContext";
import CreateUsernameModal from "../components/CreateUsernameModal";
import PetCard from "../components/PetCard";

const Home = () => {
  const { user, displayName, username } = useUserContext();

  return (
    <div>
      <h1 className="text-7xl font-bold">Home</h1>
      {user && <h2>Olá, {displayName}</h2>}
      {user && displayName === "Google" && <CreateUsernameModal />}
      {user && username && <p>Seu nome de usuário é {username}</p>}
      <PetCard
        name="Jason"
        species="Gato"
        image="./jason.jpg"
        location="Ipanema, MG"
        age="3 anos"
        gender="Macho"
        size="Pequeno"
      />
    </div>
  );
};

export default Home;
