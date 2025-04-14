import { useAuthentication } from "../hooks/useAuthentication";
import { FormEvent, useState } from "react";

interface Props {
  setRecoverPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecoverPassword = ({ setRecoverPasswordModal }: Props) => {
  const { loading, recoverPassword } = useAuthentication();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    recoverPassword(email);
    setRecoverPasswordModal(false);
    setEmail("");
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30">
      <div className="bg-bgGray w-full max-w-[550px] mx-2 rounded-lg relative">
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setRecoverPasswordModal(false)}
        ></i>
        <form
          className="flex flex-col gap-5 px-7 py-10"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-medium mb-3">
              Recuperar senha
            </h2>
            <p className="text-lg">
              Digite o seu{" "}
              <span className="text-accentBlue font-medium">e-mail</span> para
              receber o link de{" "}
              <span className="text-accentBlue font-medium">
                recuperação de senha
              </span>
              . 📩
            </p>
          </div>
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

          <button
            type="submit"
            className={`text-lg font-medium py-2 rounded-lg duration-200 hover:bg-[#1852f2] shadow-md ${
              loading
                ? "cursor-not-allowed opacity-90 bg-[#1852f2]"
                : "bg-[#1877F2] cursor-pointer"
            }`}
          >
            Enviar email
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
