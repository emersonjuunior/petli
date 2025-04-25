import { useAuthentication } from "../hooks/useAuthentication";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useUserContext();

  return (
    <header className="min-h-[50px] h-[8vh] bg-[#303030] opacity-95 mb-12 shadow-sm sticky top-0 z-50 border-b-[#404040] border-b-2">
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between h-full px-4">
        <div className="flex justify-center items-center">
          <Link to="/">
            <p className="font-serif text-5xl">petli</p>
          </Link>
        </div>
        <nav>
          <ul className="flex gap-20 justify-center items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sobre"
                className={({ isActive }) =>
                  `text-lg tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Sobre
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quero-adotar"
                className={({ isActive }) =>
                  `text-lg tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Quero adotar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/novo-pet"
                className={({ isActive }) =>
                  `text-lg tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Quero Doar
              </NavLink>
            </li>
            {user ? (
              <li className="flex items-center justify-center">
                <img
                  src="/no-user.png"
                  alt="Foto de perfil do usuário"
                  className="size-11"
                />
              </li>
            ) : (
              <li>
                <div className="flex justify-center items-center gap-5">
                  <Link to="/login">
                    <button className="text-lg cursor-pointer">Entrar</button>
                  </Link>
                  <Link to="/cadastro">
                    <button className="px-3 py-2 text-lg font-medium bg-primaryRed rounded-lg hover:bg-rose-700 duration-200 cursor-pointer">
                      Cadastrar-se
                    </button>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
