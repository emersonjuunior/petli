import { FormEvent, useState } from "react";
import InputWarning from "./InputWarning";
import Error from "./Error";
import { useAuthentication } from "../hooks/useAuthentication";

interface Props {
  register: string;
}

const CreateUserModal = ({ register }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { error, setError } = useAuthentication();

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^a-zA-Z0-9_]/g, "");
    setUsername(filteredValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-bgGray w-full max-w-[500px] mx-2 rounded-lg">
        <form
          className="flex flex-col gap-4 px-10 py-8"
          onSubmit={handleSubmit}
        >
          <h3 className="text-lg">
            Antes de prosseguir com o Cadastro pelo Facebook, escreva seu{" "}
            <span className="font-medium text-accentBlue">nome de usuário</span>
            :
          </h3>
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
          <button
            type="submit"
            className="text-lg font-medium bg-[#1877F2] py-2 rounded-lg cursor-pointer duration-200 hover:bg-[#1852f2] shadow-md"
          >
            Cadastrar
          </button>
          {error && <Error error={error} setError={setError} />}
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
