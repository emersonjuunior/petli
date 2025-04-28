import { useUserContext } from "../context/UserContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { NavLink } from "react-router-dom";
import { useRef, useEffect } from "react";

interface Props {
  toggleMenu: () => void;
  headerRef: React.RefObject<HTMLElement | null>; 
}

const Menu = ({ toggleMenu, headerRef }: Props) => {
  const { user, userImage, displayName, username } = useUserContext();
  const { logout } = useAuthentication();

  const menuRef = useRef<HTMLDivElement>(null);

  // fecha o menu ao clicar em qualquer lugar fora dele e do header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu, headerRef]);

  return (
    <nav
      ref={menuRef}
      className="nav-menu absolute z-30 right-0 top-[8vh] min-h-[92vh] w-full max-w-[420px] bg-[#303030] border-[#404040] border-1 border-t-0 text-xl lg:hidden"
    >
      {user && (
        <>
          <div className="flex flex-col gap-3 w-full justify-center items-center pt-4 mb-4">
            <img
              src={userImage!}
              alt={`Foto de Perfil do Usuário ${displayName}`}
              className="size-13 rounded-full"
            />
            <p className="font-medium">Olá, {username}</p>
          </div>
          <hr className="text-[#474747] my-5" />
          <ul className="flex flex-col items-center justify-center gap-5">
            <li onClick={toggleMenu}>
              <NavLink
                to={`/${username}`}
                className={({ isActive }) =>
                  `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Meu Perfil
              </NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink
                to="/minhas-adocoes"
                className={({ isActive }) =>
                  `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Minhas adoções
              </NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink
                to="/minhas-doacoes"
                className={({ isActive }) =>
                  `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                    isActive
                      ? "after:w-full after:bg-secondaryYellow"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                Minhas doações
              </NavLink>
            </li>
          </ul>
          <hr className="text-[#474747] mt-5" />
        </>
      )}
      <ul className="mt-5 flex flex-col items-center justify-center gap-5">
        <li onClick={toggleMenu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                isActive
                  ? "after:w-full after:bg-secondaryYellow"
                  : "after:w-0 hover:after:w-full"
              }`
            }
          >
            Início
          </NavLink>
        </li>
        <li onClick={toggleMenu}>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                isActive
                  ? "after:w-full after:bg-secondaryYellow"
                  : "after:w-0 hover:after:w-full"
              }`
            }
          >
            Sobre
          </NavLink>
        </li>
        <li onClick={toggleMenu}>
          <NavLink
            to="/quero-adotar"
            className={({ isActive }) =>
              `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                isActive
                  ? "after:w-full after:bg-secondaryYellow"
                  : "after:w-0 hover:after:w-full"
              }`
            }
          >
            Quero adotar
          </NavLink>
        </li>
        <li onClick={toggleMenu}>
          <NavLink
            to="/quero-doar"
            className={({ isActive }) =>
              `text-xl tracking-wider duration-200 hover:text-gray-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all hover:after:w-full hover:after:bg-secondaryYellow ${
                isActive
                  ? "after:w-full after:bg-secondaryYellow"
                  : "after:w-0 hover:after:w-full"
              }`
            }
          >
            Quero doar
          </NavLink>
        </li>
      </ul>
      {user && (
        <>
          <hr className="text-[#474747] my-5" />
          <div className="w-full flex justify-center">
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="cursor-pointer"
            >
              Sair
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Menu;
