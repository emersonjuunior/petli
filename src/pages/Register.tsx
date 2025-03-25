import { FormEvent, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { IUser } from "../interfaces/User";

// components
import Error from "../components/Error";
import InputWarning from "../components/InputWarning";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const { createUser, signInWithGoogle, loading, error, setError } =
    useAuthentication();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordStrength < 3) {
      setError("Sua senha não atende os requisitos.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError(
        "O Nome de Usuário não pode conter espaços ou caracteres especiais."
      );
      return;
    }

    const newUser: IUser = {
      username,
      displayName: name,
      email,
      password,
    };

    createUser(newUser);
  };

  const checkPasswordRequirements = (password: string): void => {
    let strength = 0;

    if (password.length >= 8) {
      strength++;
    }

    if (/\d/.test(password)) {
      strength++;
    }

    if (/[a-zA-Z]/.test(password)) {
      strength++;
    }

    setPasswordStrength(strength);
  };

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^a-zA-Z0-9_]/g, "");
    setUsername(filteredValue);
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

            <label className="relative">
              <input
                type="text"
                placeholder="Nome de Usuário"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                  handleChange(e.target.value);
                }}
                onBlur={() => setIsFocused((prev) => !prev)}
                onFocus={() => setIsFocused((prev) => !prev)}
                className="w-full"
                value={username}
                minLength={4}
                maxLength={20}
              />
              {isFocused && (
                <InputWarning
                  text={
                    "O Nome de Usuário deve conter pelo menos 4 caracteres, e não pode conter espaços ou caracteres especiais."
                  }
                />
              )}
            </label>
            <label>
              <input
                type="text"
                placeholder="Nome"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                minLength={8}
                maxLength={50}
                className="w-full"
              />
            </label>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordRequirements(e.target.value);
                  }}
                  onBlur={() => setIsPasswordFocused((prev) => !prev)}
                  onFocus={() => setIsPasswordFocused((prev) => !prev)}
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
              {isPasswordFocused && (
                <div className="w-full mt-4 p-3 bg-[#242424] text-white rounded-xl rounded-tl-none shadow-lg absolute z-10 bottom-[-60px]">
                  <div className="flex w-full bg-gray-700 h-[4px]">
                    <div
                      className={`h-full transition-all duration-800 bg-green-600 ${
                        passwordStrength === 1
                          ? "w-1/3"
                          : passwordStrength === 2
                          ? "w-2/3"
                          : passwordStrength === 3
                          ? "w-full"
                          : "w-0"
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs">
                    Sua senha deve conter pelo menos 8 caracteres, 1 letra e 1
                    número.
                  </span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`text-lg font-medium py-2 rounded-lg duration-200 hover:bg-rose-700 shadow-md ${
                loading
                  ? "bg-rose-700 cursor-progress opacity-90"
                  : "bg-secondaryRed cursor-pointer"
              }`}
            >
              {loading ? "Aguarde..." : "Cadastrar"}
            </button>
            <div>{error && <Error error={error} setError={setError} />}</div>
          </form>
          <div className="w-full">
            <div className="flex w-full items-center justify-center gap-2 mb-5">
              <div className="w-full bg-gray-400 h-[1px]"></div>
              <p className="whitespace-nowrap">Ou cadastre-se com</p>
              <div className="w-full bg-gray-400 h-[1px]"></div>
            </div>
            <div
              className="mb-10 bg-[#404040] p-4 rounded-full shadow-md cursor-pointer duration-300 hover:scale-105 flex items-center justify-center gap-4 w-fit mx-auto"
              onClick={signInWithGoogle}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                className="w-6"
              />
              <p>Cadastrar com o Google</p>
            </div>
          </div>
          <Link to="/login">
            <p>
              Já tem uma conta?{" "}
              <span className="text-accentBlue">Fazer Login</span>
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
