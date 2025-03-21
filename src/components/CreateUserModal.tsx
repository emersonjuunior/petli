import { useState } from "react";
import InputWarning from "./InputWarning";

const CreateUserModal = () => {
  const [username, setUsername] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^a-zA-Z0-9_]/g, "");
    setUsername(filteredValue);
  };

  const handleRegister = () => {
    
  }

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-bgGray w-full max-w-[500px] mx-2 rounded-lg">
        <form className="flex flex-col gap-4 px-10 py-8">
          <h3 className="text-lg">
            Antes de prosseguir com o Cadastro pelo Facebook, escreva seu <span className="font-medium text-accentBlue">nome
            de usuário</span>:
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
                  "O Nome de Usuário não pode conter espaços ou caracteres especiais."
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
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
