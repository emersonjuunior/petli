import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Error";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  species: string;
  setSpecies: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  breed: string;
  setBreed: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const FirstStep = ({
  setStep,
  species,
  setSpecies,
  name,
  setName,
  breed,
  setBreed,
  gender,
  setGender,
  setAge,
  size,
  setSize,
  image,
  setImage,
}: Props) => {
  const [timeValue, setTimeValue] = useState("");
  const [time, setTime] = useState("anos");
  const [error, setError] = useState<string | null>(null);

  // permite o usuário escrever apenas números
  const handleTimeValue = (value: string) => {
    if (/^\d*$/.test(value)) {
      setTimeValue(value);
    }
  };

  // altera o state "age" apenas quando o valor numério de idade for alterado
  const handleAge = (value: string, type: string) => {
    const num = Number(value);

    if (!isNaN(num) && value.trim() !== "") {
      let label = type;

      if (num === 1) {
        label = type === "anos" ? "ano" : "mês";
      }

      setAge(`${num} ${label}`);
    } else {
      setAge("");
    }
  };

  // input de enviar imagens
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // mostra o preview da imagem
      setImage(URL.createObjectURL(file));
    }
  };

  // envio do formulario
  const handleFirstStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parseInt(timeValue) > 20 && time === "anos") {
      setError("Por favor, insira uma idade válida.");
      return;
    }

    if (image === "") {
      setError("Por favor, envie uma imagem do bichinho.");
      return;
    }

    setStep(2);
  };

  return (
    <div className="bg-bgGray rounded-lg shadow-lg h-[585px] min-h-fit">
      <h2 className="text-lg md:text-2xl font-medium p-4 md:px-8 md:py-6">
        Vamos começar com as principais informações do pet.
      </h2>
      <div className="px-3 md:px-9">
        <div className="w-full h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      </div>
      <form
        className="px-3 md:px-10 flex flex-col gap-4 md:gap-6"
        onSubmit={handleFirstStep}
      >
        <div className="px-3 md:px-7 flex flex-col gap-6 h-[370px] min-h-fit">
          <fieldset className="flex-1 flex items-center gap-5 md:gap-10">
            <label className="flex-1">
              <input
                type="text"
                placeholder="Nome do pet"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full"
                minLength={2}
                maxLength={14}
              />
            </label>
            <label className="flex-1">
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="border-b-2 border-gray-400 w-full h-[34px] px-1"
                required
              >
                <option value="" disabled hidden>
                  Espécie
                </option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
              </select>
            </label>
          </fieldset>
          <div className="flex-1 flex items-center gap-5 md:gap-10">
            <fieldset className="flex-1 flex items-center gap-5 md:gap-10">
              <label className="flex-1">
                <input
                  type="text"
                  placeholder="Raça"
                  required
                  onChange={(e) => setBreed(e.target.value)}
                  value={breed}
                  minLength={2}
                  maxLength={30}
                  className="w-full"
                />
              </label>
              <label className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Idade"
                  required
                  onChange={(e) => {
                    handleAge(e.target.value, time);
                    handleTimeValue(e.target.value);
                  }}
                  value={timeValue}
                  minLength={1}
                  maxLength={2}
                  className="w-full"
                />
                <select
                  value={time}
                  onChange={(e) => {
                    handleAge(timeValue, e.target.value);
                    setTime(e.target.value);
                  }}
                  className="absolute top-0 right-0 md:w-30 text-sm font-medium h-[34px]"
                  required
                >
                  <option value="anos">anos</option>
                  <option value="meses">meses</option>
                </select>
              </label>
            </fieldset>
          </div>
          <fieldset className="flex-1 flex items-center gap-5 md:gap-10">
            <label className="flex-1">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border-b-2 border-gray-400 w-full h-[34px] px-1"
                required
              >
                <option value="" disabled hidden>
                  Gênero
                </option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
                <option value="Desconhecido">Desconhecido</option>
              </select>
            </label>
            <label className="flex-1">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="border-b-2 border-gray-400 w-full h-[34px] px-1"
              >
                <option value="" disabled hidden>
                  Estatura
                </option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </label>
          </fieldset>
          <label className="relative h-[150px] md:h-[180px] w-full flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-xl">
            <div className="flex items-center justify-center">
              <img
                src="./upload-picture.png"
                alt="Nos envie uma foto do seu pet!"
                className="w-25 h-auto"
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="text-center text-sm md:text-[16px] max-w-[90%] font-medium">
                Clique para enviar uma foto do seu pet!
              </span>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {image != "" && (
            <div className="relative w-fit">
              <div>
                <img
                  src={image}
                  alt={`Fotos do Pet ${name}`}
                  className="size-14 rounded-md object-cover"
                />
                <div
                  className="absolute top-[1px] right-0 bg-bgBlack z-10 p-2 rounded-full flex items-center justify-center"
                  onClick={() => setImage("")}
                >
                  <i className="fa-solid fa-xmark absolute text-xs cursor-pointer"></i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-[.5px] bg-[#555252] mx-auto"></div>
        <div
          className={`flex w-full items-center h-[50px] min-h-fit gap-1 mb-3 xl:mb-0 ${
            error ? "justify-between" : "justify-end"
          } ${image != "" ? "pb-3" : ""}`}
        >
          {error && <Error error={error} setError={setError} />}
          <div className="flex gap-2 md:gap-6 items-center">
            <Link to="/">
              <span className="text-sm md:text-base font-light cursor-pointer">
                Voltar
              </span>
            </Link>
            <button
              type="submit"
              className="font-medium sm:text-lg bg-[#614cfc] px-3 sm:px-8 h-[35px] sm:h-[45px] rounded-xl cursor-pointer duration-200 hover:bg-[#614cfcda]"
            >
              Avançar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FirstStep;
