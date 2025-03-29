import { useUserContext } from "../context/UserContext";
import CreateUserModal from "../components/CreateUserModal";

const Home = () => {
  const { user, displayName } = useUserContext();

  return (
    <div>
      <h1 className="text-7xl font-bold">Home</h1>
      {user && <h2>Olá, {displayName}</h2>}
      {user && displayName === "Google" && <CreateUserModal />}
    </div>
  );
};

export default Home;
