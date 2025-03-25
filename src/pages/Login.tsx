import { FormEvent, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import { ILogin } from "../interfaces/User";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { login, signInWithGoogle, loading, error, setError } =
    useAuthentication();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ILogin = {
      email,
      password,
    };

    login(data);
  };

  return (
    <main className="w-full px-3 sm:px-6">
      <div className="w-full max-w-6xl h-[580px] sm:h-[650px] mx-auto flex">
        <section className="hidden lg:block flex-1 bg-accentBlue rounded-tl-2xl rounded-bl-2xl relative">
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
            <p className="font-medium italic">
              Faça do mundo um lugar melhor.{" "}
            </p>
          </div>
          <div className="bg-accentBlue absolute w-[200px] h-full right-[-200px] top-0"></div>
        </section>
        <section className="flex-[1.4] bg-bgGray rounded-2xl z-10">
          <div className="w-full max-w-lg lg:max-w-md px-4 h-full mx-auto flex flex-col items-center justify-center">
            <form
              className="w-full flex flex-col gap-6 mb-6"
              onSubmit={handleLogin}
            >
              <h1 className="font-bold text-3xl sm:text-4xl self-start">
                Bem-vindo de volta!
              </h1>
              <label>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  minLength={10}
                  maxLength={50}
                  className="w-full"
                />
              </label>
              <div className="w-full flex flex-col relative gap-3">
                <label className="w-full">
                  <input
                    type={viewPassword ? "text" : "password"}
                    placeholder="Senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full pr-15"
                  />
                </label>
                <img
                  src={`./${viewPassword ? "no-" : ""}view-password.png`}
                  alt="Visualizar Senha"
                  className="size-6 absolute right-0 cursor-pointer"
                  onClick={() => setViewPassword((prev) => !prev)}
                />
              </div>
              <button
                type="submit"
                className={`text-lg font-medium py-2 rounded-lg duration-200 hover:bg-rose-700 shadow-md ${
                  loading
                    ? "bg-rose-700 cursor-progress opacity-90"
                    : "bg-secondaryRed cursor-pointer"
                }`}
              >
                {loading ? "Aguarde..." : "Entrar"}
              </button>
              <div>{error && <Error error={error} setError={setError} />}</div>
            </form>
            <div className="w-full">
              <div className="flex w-full items-center justify-center gap-2 mb-5">
                <div className="w-full bg-gray-400 h-[1px]"></div>
                <p className="whitespace-nowrap">Ou entre com</p>
                <div className="w-full bg-gray-400 h-[1px]"></div>
              </div>
              <div
                className="mb-10 bg-[#404040] py-4 px-6 rounded-full shadow-md cursor-pointer duration-300 hover:scale-105 flex items-center justify-center gap-4 w-fit mx-auto"
                onClick={signInWithGoogle}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-6"
                />
                <p>Entrar com o Google</p>
              </div>
            </div>
            <Link to="/cadastro">
              <p>
                Ainda não tem uma conta?{" "}
                <span className="text-accentBlue">Cadastrar-se</span>
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
