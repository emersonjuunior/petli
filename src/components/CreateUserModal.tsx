import { FormEvent, useState } from "react";
import InputWarning from "./InputWarning";
import Error from "./Error";
import { useAuthentication } from "../hooks/useAuthentication";
import { useUserContext } from "../context/UserContext";

const CreateUserModal = () => {
  const { user } = useUserContext();
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setFirestoreUsername, error, setError } = useAuthentication();

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
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-bgGray w-full max-w-[520px] mx-2 rounded-lg">
        <form
          className="flex flex-col gap-5 px-10 py-10"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl font-medium mb-1">
              Seja muito <span className="text-primaryYellow">bem-vindo!</span>{" "}
              <span className="text-3xl">🐾</span>
            </h2>
            <p className="text-lg">
              Antes de prosseguir, por favor escreva seu{" "}
              <span className="text-accentBlue">nome de usuário</span> e seu{" "}
              <span className="text-accentBlue">nome de exibição</span>.
            </p>
          </div>
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
          <button
            type="submit"
            className="text-lg font-medium bg-[#1877F2] py-2 rounded-lg cursor-pointer duration-200 hover:bg-[#1852f2] shadow-md"
          >
            Enviar
          </button>
          {error && <Error error={error} setError={setError} />}
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
