import { FormEvent, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { IUser } from "../interfaces/User";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { createUser, loading } = useAuthentication();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: IUser = {
      username,
      displayName: name,
      email,
      password,
    };

    createUser(newUser);
  };

  return (
    <main className="w-full max-w-6xl h-[700px] mx-auto flex">
      <section className="flex-1 bg-accentBlue rounded-tl-2xl rounded-bl-2xl relative">
        <div className="flex flex-col items-center justify-center h-full py-4 px-5 text-stone-900">
          <h2 className="font-medium text-2xl text-center mb-2">
            Seu melhor amigo pode estar esperando por você. Que tal mudar uma
            vida hoje?
          </h2>
          <img
            src="./register-illustration.png"
            alt="Ilustração de um gatinho no espaço"
            className="mb-5"
          />
          <p className="font-medium italic">Faça do mundo um lugar melhor. </p>
        </div>
        <div className="bg-accentBlue absolute w-[200px] h-full right-[-200px] top-0"></div>
      </section>
      <section className="flex-[1.4] bg-bgGray rounded-2xl z-10">
        <div className="w-full max-w-md h-full mx-auto flex flex-col items-center justify-center">
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col gap-5 mb-5"
          >
            <h1 className="font-bold text-4xl self-start">Criar Conta</h1>
            <input
              type="text"
              placeholder="Nome de Usuário"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="text"
              placeholder="Nome"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="w-full flex relative">
              <input
                type={viewPassword ? "text" : "password"}
                placeholder="Senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full pr-15"
              />
              <img
                src={`./${viewPassword ? "no-" : ""}view-password.png`}
                alt="Visualizar Senha"
                className="size-6 absolute right-0 cursor-pointer"
                onClick={() => setViewPassword((prev) => !prev)}
              />
            </div>
            <button
              type="submit"
              className="text-lg font-medium bg-secondaryRed py-2 rounded-lg cursor-pointer duration-200 hover:bg-rose-700"
            >
              Cadastrar
            </button>
          </form>
          <div className="w-full">
            <div className="flex w-full items-center justify-center gap-2 mb-5">
              <div className="w-full bg-gray-400 h-[1px]"></div>
              <p className="whitespace-nowrap">Ou cadastre-se com</p>
              <div className="w-full bg-gray-400 h-[1px]"></div>
            </div>
            <div className="flex justify-evenly mb-10">
              <div className="flex items-center justify-center bg-[#404040] p-3 rounded-full shadow-md cursor-pointer duration-300 hover:scale-110">
                <i className="devicon-facebook-plain colored text-2xl"></i>
              </div>
              <div className="flex items-center justify-center bg-[#404040] p-3 rounded-full shadow-md cursor-pointer duration-300 hover:scale-110">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-6"
                />
              </div>
              <div className="flex items-center justify-center bg-[#404040] p-3 rounded-full shadow-md cursor-pointer duration-300 hover:scale-110">
                <i className="devicon-twitter-plain colored text-2xl"></i>
              </div>
            </div>
          </div>
          <p>
            Já tem uma conta?{" "}
            <span className="text-accentBlue">Fazer Login</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
