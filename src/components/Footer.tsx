import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user, username } = useUserContext();

  const goToSection = (page: string, id: string) => {
    navigate(page, { replace: false });
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer className="border-t-[#404040] border-t-2 bg-[#303030] w-full shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.2)]">
      <div className="w-full max-w-7xl mx-auto py-8 md:py-10 px-3">
        <div className="flex flex-col sm:flex-row justify-between gap-6 md:gap-20 lg:gap-30 xl:gap-0">
          <p className="font-serif text-5xl sm:w-2/5 lg:w-fit">
            petli
          </p>
          <section className="w-full max-w-5xl grid grid-cols-2 gap-4 sm:gap-10 lg:grid-cols-4">
            <ul className="flex flex-col gap-1 sm:gap-2">
              <h4 className="font-semibold uppercase font-mont tracking-widest sm:mb-1">
                Início
              </h4>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/", "#home")}
              >
                Home
              </li>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/", "#por-que-adotar")}
              >
                Por que adotar?
              </li>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/", "#esperando-um-lar")}
              >
                Esperando um lar
              </li>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/", "#perguntas-frequentes")}
              >
                Perguntas frequentes
              </li>
            </ul>
            <ul className="flex flex-col gap-1 sm:gap-2">
              <h4 className="font-semibold uppercase font-mont tracking-widest sm:mb-1">
                Sobre
              </h4>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/sobre", "#sobre-nos")}
              >
                Sobre nós
              </li>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/sobre", "#motivacao")}
              >
                Motivação
              </li>
              <li
                className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base"
                onClick={() => goToSection("/sobre", "#como-funciona")}
              >
                Como funciona?
              </li>
            </ul>
            <ul className="flex flex-col gap-1 sm:gap-2">
              <h4 className="font-semibold uppercase font-mont tracking-widest sm:mb-1">
                Adotar ou Doar
              </h4>
              <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                <Link to="/quero-adotar">Quero adotar</Link>
              </li>
              <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                <Link to="/novo-pet">Quero doar</Link>
              </li>
            </ul>
            {user ? (
              <ul className="flex flex-col gap-1 sm:gap-2">
                <h4 className="font-semibold uppercase font-mont tracking-widest sm:mb-1">
                  Minha conta
                </h4>
                <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                  <Link to={`/${username}`}>Meu perfil</Link>
                </li>
                <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                  <Link to="/minhas-adocoes">Minhas adoções</Link>
                </li>
                <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                  <Link to="/minhas-doacoes">Minhas doações</Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-1 sm:gap-2">
                <h4 className="font-semibold uppercase font-mont tracking-widest sm:mb-1">
                  Acesse sua conta
                </h4>
                <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                  <Link to="/cadastro">Cadastrar-se</Link>
                </li>
                <li className="cursor-pointer text-gray-200 duration-300 hover:text-white text-sm sm:text-base">
                  <Link to="/login">Entrar</Link>
                </li>
              </ul>
            )}
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
