import { FormEvent, useState } from "react";
import InputWarning from "./InputWarning";
import Error from "./Error";
import { useAuthentication } from "../hooks/useAuthentication";
import { useUserContext } from "../context/UserContext";

const CreateUsernameModal = () => {
  const { user } = useUserContext();
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setFirestoreUsername, error, setError, loading } =
    useAuthentication();

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^a-zA-Z0-9_]/g, "");
    setUsername(filteredValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      displayName: name,
      username,
    };

    setFirestoreUsername(user!, data);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div className="bg-bgGray w-full max-w-[550px] mx-2 rounded-lg">
        <form
          className="flex flex-col gap-5 p-5 md:p-10"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl font-medium mb-1">
              Seja muito <span className="text-primaryYellow">bem-vindo!</span>{" "}
              <span className="text-3xl">🐾</span>
            </h2>
            <p className="text-lg">
              Antes de prosseguir, por favor escreva seu{" "}
              <span className="text-accentBlue">nome completo</span> e seu{" "}
              <span className="text-accentBlue">nome de usuário</span>.
            </p>
          </div>
          <label>
            <input
              type="text"
              placeholder="Nome completo"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              minLength={8}
              maxLength={50}
              className="w-full"
            />
          </label>
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
              className="w-full mb-2"
              value={username}
              minLength={4}
              maxLength={20}
            />
            {isFocused && (
              <InputWarning
                text={
                  "O Nome de Usuário deve conter pelo menos 4 caracteres, e não pode conter espaços ou caracteres especiais."
                }
                modal={true}
              />
            )}
          </label>
          <p className="text-sm">
            <span className="font-medium">Obs:</span> Você{" "}
            <span className="font-medium">não poderá alterar</span> seu nome de
            usuário depois.
          </p>
          {error && <Error error={error} setError={setError} />}
          <button
            type="submit"
            className={`text-lg font-medium py-2 rounded-lg duration-200 hover:bg-[#1852f2] shadow-md ${
              loading
                ? "cursor-not-allowe opacity-90 bg-[#1852f2]"
                : "bg-[#1877F2] cursor-pointer"
            }`}
          >
            {loading ? "Aguarde..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUsernameModal;
