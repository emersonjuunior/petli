import { useUserContext } from "../context/UserContext";
import CreateUserModal from "../components/CreateUserModal";
import { useState, useEffect } from "react";
import Success from "../components/Success";

const Home = () => {
  const { user, displayName } = useUserContext();
  const [teste, setTeste] = useState(false)

  return (
    <div>
      <h1 className="text-7xl font-bold">Home</h1>
      {user && <h2>Olá, {displayName}</h2>}
      {user && displayName === "Google" && <CreateUserModal />}
      <button onClick={() => setTeste(true)}>oi</button>
      {teste && <Success msg={"Cadastro concluído com sucesso!"} />}
    </div>
  );
};

export default Home;
