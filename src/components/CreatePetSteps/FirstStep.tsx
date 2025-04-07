import { FormEvent, useState } from "react";
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
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
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
  age,
  setAge,
  size,
  setSize,

  setImage,
}: Props) => {
  const [timeValue, setTimeValue] = useState("");
  const [time, setTime] = useState("anos");

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

  const [error, setError] = useState<string | null>(null);

  const handleFirstStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parseInt(timeValue) > 20 && time === "anos") {
      setError("Por favor, insira uma idade válida.");
    }

    setStep(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // mostra o preview da imagem
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-bgGray rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-medium p-5 md:px-8 md:py-6">
        Vamos começar com as principais informações do pet.
      </h2>
      <div className="w-full max-w-[96%] h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      <form
        className="px-6 md:px-10 flex flex-col gap-6"
        onSubmit={handleFirstStep}
      >
        <div className="flex-1 flex items-center gap-10">
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
              className="border-b-2 border-gray-400 w-full h-[34px] px-2"
            >
              <option value="" disabled hidden>
                Espécie
              </option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </label>
        </div>
        <div className="flex-1 flex items-center gap-10">
          <div className="flex-1 flex items-center gap-10">
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
                  setTimeValue(e.target.value);
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
                className="absolute top-0 right-0 w-30 text-[16px] font-medium h-[34px] px-2"
              >
                <option value="anos">anos</option>
                <option value="meses">meses</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-10">
          <label className="flex-1">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border-b-2 border-gray-400 w-full h-[34px] px-2"
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
              className="border-b-2 border-gray-400 w-full h-[34px] px-2"
            >
              <option value="" disabled hidden>
                Estatura
              </option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </label>
        </div>
        <label className="relative h-[200px] w-full  flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-xl">
          <div className="flex items-center justify-center">
            <img
              src="./upload-picture.png"
              alt="Nos envie uma foto do seu pet!"
              className="w-25 h-auto"
            />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-center text-[16px] max-w-[90%] font-medium">
              Clique para enviar uma foto do seu pet!
            </span>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
        <div className="flex flex-col w-full items-end mb-5">
          {error && <Error error={error} setError={setError} />}
          <button
            type="submit"
            className="font-medium text-lg bg-[#614cfc] px-8 h-[45px] rounded-xl cursor-pointer duration-200 hover:bg-[#614cfcda]"
          >
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirstStep;
