import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout } = useAuthentication();

  return (
    <header className="min-h-[50px] h-[8vh] bg-bgGray flex items-center justify-around mb-12 shadow-sm">
      <div className="flex-1 flex justify-center">
        <Link to="/">
          <p className="font-serif text-5xl">petli</p>
        </Link>
      </div>
      <div className="justify-self-end flex-1 flex justify-end px-4">
        <button
          onClick={logout}
          className="px-4 py-2 bg-white rounded-lg text-black font-bold cursor-poitner"
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
