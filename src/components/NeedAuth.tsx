import { Link } from "react-router-dom";

const NeedAuth = () => {
  return (
    <section className="min-h-[92vh] relative">
      <div className="min-h-[92vh] w-full animate-pulse"></div>
      <div className="w-full h-full bg-black/30 absolute top-0 left-0 flex justify-center items-center z-50">
        <div className="bg-bgGray w-full max-w-[620px] mx-2 rounded-lg py-4 px-4 md:p-8 relative shadow-lg">
          <h1 className="text-xl md:text-2xl max-w-9/10 mb-4">
            Você precisa ter uma conta para doar um pet.
          </h1>
          <p className="text-lg mb-5 md:mb-6">
            Para doar um pet e ajudar na adoção responsável, é necessário estar
            logado em sua conta.
          </p>
          <div className="flex gap-8 justify-end items-center">
            <Link to="/login">
              <button className="text-lg font-semibold cursor-pointer duration-300 hover:text-gray-200">Entrar</button>
            </Link>
            <Link to="/cadastro">
              <button className="px-3 py-2 text-lg font-medium bg-primaryRed rounded-lg hover:bg-rose-700 duration-200 cursor-pointer">
                Cadastrar-se
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeedAuth;
