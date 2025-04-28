import { useUserContext } from "../context/UserContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { NavLink, Link } from "react-router-dom";
import { useRef, useEffect } from "react";

interface Props {
  toggleMenu: () => void;
}

const Menu = ({ toggleMenu }: Props) => {
  const { user, userImage, displayName, username } = useUserContext();
  const { logout } = useAuthentication();

  const menuRef = useRef<HTMLDivElement>(null);

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);

  return (
    <nav
      ref={menuRef}
      className="absolute z-30 right-0 top-[8vh] min-h-[92vh] w-full max-w-[400px] bg-[#303030] border-[#404040] border-1 border-t-0 text-xl lg:hidden"
    >
      {user && (
        <>
          <div className="flex flex-col gap-3 w-full justify-center items-center pt-4 mb-4">
            <img
              src={userImage!}
              alt={`Foto de Perfil do Usuário ${displayName}`}
              className="size-13 rounded-full"
            />
            <p className="font-medium">Olá, {displayName}</p>
          </div>
          <hr className="text-[#474747] my-5" />
          <ul className="flex flex-col items-center justify-center gap-5">
            <li onClick={toggleMenu}>
              <Link to={`/${username}`}>Meu Perfil</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to={"/minhas-adocoes}"}>Minhas adoções</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to={"/minhas-doacoes"}>Minhas doações</Link>
            </li>
          </ul>
          <hr className="text-[#474747] mt-5" />
        </>
      )}
      <ul className="mt-5 flex flex-col items-center justify-center gap-5">
        <li onClick={toggleMenu}>
          <NavLink to="/">Início</NavLink>
        </li>
        <li onClick={toggleMenu}>
          <NavLink to="/sobre">Sobre</NavLink>
        </li>
        <li onClick={toggleMenu}>
          <NavLink to="/quero-adotar">Quero adotar</NavLink>
        </li>
        <li onClick={toggleMenu}>
          <NavLink to="/quero-doar">Quero doar</NavLink>
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
