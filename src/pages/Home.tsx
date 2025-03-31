import { useUserContext } from "../context/UserContext";
import CreateUserModal from "../components/CreateUserModal";

const Home = () => {
  const { user, displayName, username } = useUserContext();

  return (
    <div>
      <h1 className="text-7xl font-bold">Home</h1>
      {user && <h2>Olá, {displayName}</h2>}
      {user && displayName === "Google" && <CreateUserModal />}
      {user && username && <p>Seu nome de usuário é {username}</p>}
    </div>
  );
};

export default Home;
