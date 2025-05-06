import { useUserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useEffect, useRef } from "react";

interface Props {
  toggleProfileMenu: () => void;
  headerRef: React.RefObject<HTMLElement | null>;
}

const ProfileMenu = ({ toggleProfileMenu, headerRef }: Props) => {
  const { displayName, userImage, username } = useUserContext();
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
        toggleProfileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleProfileMenu, headerRef]);

  return (
    <nav
      ref={menuRef}
      className="nav-menu absolute z-30 right-0 w-[320px] rounded-xl rounded-t-none bg-[#303030] border-[#404040] top-[60px] border-1 border-t-0 text-lg p-3"
    >
      <div className="flex items-center justify-center gap-4 truncate">
        <div>
          <img
            src={userImage!}
            alt={`Foto de Perfil do Usuário ${username}`}
            className="size-13 rounded-full"
          />
        </div>
        <div className="max-w-[190px]">
          <h3 className="font-medium text-xl truncate">{username}</h3>
          <p className="text-lg truncate">{displayName}</p>
        </div>
      </div>
      <hr className="text-[#474747] my-5" />
      <ul className="flex flex-col items-center justify-center gap-5">
        <li onClick={toggleProfileMenu}>
          <NavLink to={`/${username}`} className="tracking-wider hover:text-gray-300 duration-200">
            Meu Perfil
          </NavLink>
        </li>
        <li onClick={toggleProfileMenu}>
          <NavLink
            to="/minhas-adocoes"
            className="tracking-wider hover:text-gray-300 duration-200"
          >
            Minhas adoções
          </NavLink>
        </li>
        <li onClick={toggleProfileMenu}>
          <NavLink
            to="/minhas-doacoes"
            className="tracking-wider hover:text-gray-300 duration-200"
          >
            Minhas doações
          </NavLink>
        </li>
      </ul>
      <hr className="text-[#474747] my-5" />
      <div className="w-full flex justify-center">
        <button
          onClick={() => {
            logout();
            toggleProfileMenu();
          }}
          className="cursor-pointer"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};

export default ProfileMenu;
