import { useAuthentication } from "../hooks/useAuthentication";

const Home = () => {
  const { logout } = useAuthentication();

  return (
    <div>
      <h1 className="text-7xl font-bold">Home</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Home;
