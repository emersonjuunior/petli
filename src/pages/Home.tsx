import { useUserContext } from "../context/UserContext";
import CreateUserModal from "../components/CreateUserModal";
import { useState, useEffect } from "react";

const Home = () => {
  const { user } = useUserContext();
  const [name, setName] = useState(user!.displayName);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        if (user.displayName != name) {
          setName(user.displayName);
        }
      }, 300);
    }
  }, []);

  return (
    <div>
      <h1 className="text-7xl font-bold">Home</h1>
      {user && <h2>Olá, {name}</h2>}
      {user && name === "Google" && <CreateUserModal />}
    </div>
  );
};

export default Home;
