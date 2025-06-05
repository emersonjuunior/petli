import { useRef, useEffect, useState, FormEvent } from "react";
import Error from "./Error";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";

interface Props {
  setAdoptModal: React.Dispatch<React.SetStateAction<boolean>>;
  petId: string;
  name: string;
  gender: string;
  owner: string;
  species: string;
  petImage: string;
  adoptionQuestions: string;
}

interface IBGEUF {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

interface IBGECity {
  id: number;
  nome: string;
}

const AdoptionRequest = ({
  setAdoptModal,
  petId,
  name,
  gender,
  owner,
  species,
  petImage,
  adoptionQuestions,
}: Props) => {
  const { createAdoptionRequest } = useAdoptionRequest();
  const modalAdoptRef = useRef<HTMLDivElement>(null);
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState<IBGEUF[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [adoptionAnswers, setAdoptionAnswers] = useState("")

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalAdoptRef.current &&
        !modalAdoptRef.current.contains(event.target as Node)
      ) {
        setAdoptModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAdoptModal]);

  // busca os estados do brasil com a api do ibge
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((res) => res.json())
      .then((data) => {
        const statesData = data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
        setStates(statesData);
      })
      .catch(() => {
        setError("Algo deu errado, tente novamente mais tarde.");
      });
  }, []);

  // busca as cidades do estado selecionado, quando ele é alterado
  useEffect(() => {
    setCity("");
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      })
      .catch(() => {
        setError("Algo deu errado, tente novamente mais tarde.");
      });
  }, [uf]);

  // altera o state quando uma cidade é selecionada
  const handleSelectedCity = (value: string) => {
    setCity(value);
    setLocation(`${value}, ${uf}`);
  };

  // envia a solicitação de adoção
  const handleAdoptionRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createAdoptionRequest(
      petId,
      text,
      location,
      owner,
      species,
      petImage,
      adoptionAnswers
    );

    setAdoptModal(false);
  };

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-bgGray w-full max-w-[750px] mx-2 rounded-lg p-4 md:p-8 relative max-h-[500px] md:max-h-[700px] lg:max-h-[730px] xl:max-h-[760px] overflow-y-auto"
        ref={modalAdoptRef}
      >
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setAdoptModal(false)}
        ></i>
        <form
          className="flex flex-col gap-3 md:gap-5"
          onSubmit={handleAdoptionRequest}
        >
          <h2 className="text-xl md:text-2xl font-medium max-w-8/10">
            Pronto pra dar um novo lar? 🐾
          </h2>
          <p className="text-sm md:text-base">
            Preencha o formulário abaixo para enviar sua{" "}
            <span className="font-semibold">solicitação de adoção</span>. O
            responsável vai analisar com carinho e, se aprovada, você receberá
            os <span className="font-semibold">dados de contato</span> para
            conversar diretamente com ele! {species === "Gato" ? "🐱" : "🐶"}
          </p>
          <hr className="text-[#404040]" />
          <fieldset>
            <legend className="text-lg font-medium mb-3 px-1">
              Localização 📍
            </legend>
            <div className="flex gap-3 md:gap-7">
              <label className="flex-1">
                <select
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="text-sm md:text-base border-b-2 border-gray-400 w-full h-[34px] px-2 mb-5"
                  required
                >
                  <option value="" disabled hidden>
                    Seu estado
                  </option>
                  {states.map((state) => (
                    <option value={state.sigla} key={state.sigla}>
                      {state.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex-1">
                <select
                  value={city}
                  onChange={(e) => handleSelectedCity(e.target.value)}
                  className="text-sm md:text-base border-b-2 border-gray-400 w-full h-[34px] px-2 max-h-40 overflow-y-auto"
                  required
                >
                  <option value="" disabled hidden>
                    Sua cidade
                  </option>
                  {cities.map((city) => (
                    <option value={city.nome} key={city.nome}>
                      {city.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
          <label className="flex flex-col gap-2">
            <span className="text-base md:text-[17px] font-medium">
              Conte um pouco sobre você e por que deseja adotar {""}
              {gender === "Macho"
                ? "o"
                : gender === "Fêmea"
                ? "a"
                : "o(a)"}{" "}
              {name}
            </span>
            <div className="relative">
              <textarea
                className="w-full text-sm md:text-base border-[#404040] border-2 rounded-lg md:min-h-[220px] md:max-h-[220px] min-h-[190px] max-h-[190px] px-3 py-2 md:px-4 md:py-3 focus:border-[#606060] outline-none"
                maxLength={300}
                minLength={15}
                value={text}
                placeholder="Nada informado."
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
              <p className="absolute bottom-3 right-3 font-medium rounded-lg p-[1px] ">
                {text.length}/300
              </p>
            </div>
          </label>
          <label className="flex flex-col gap-1">
            <p className="text-base md:text-[17px] font-medium">
              Responda as perguntas deixadas pelo responsável d
              {gender === "Macho" ? "o" : gender === "Fêmea" ? "a" : "o(a)"}{" "}
              {name}:
            </p>
            <span className="italic text-sm md:text-base">
              - {adoptionQuestions}
            </span>
            <div className="relative">
              <textarea
                className="w-full text-sm md:text-base border-[#404040] border-2 rounded-lg md:min-h-[220px] md:max-h-[220px] min-h-[190px] max-h-[190px] px-3 py-2 md:px-4 md:py-3 focus:border-[#606060] outline-none"
                maxLength={300}
                minLength={1}
                value={adoptionAnswers}
                placeholder="Nada informado."
                onChange={(e) => setAdoptionAnswers(e.target.value)}
                required
              ></textarea>
              <p className="absolute bottom-3 right-3 font-medium rounded-lg p-[1px] ">
                {adoptionAnswers.length}/300
              </p>
            </div>
          </label>
          <hr className="text-[#404040]" />
          <span>
            Você poderá acompanhar suas solicitações de adoção em{" "}
            <span className="font-semibold">"Minhas Adoções"</span>.
          </span>
          {error && <Error error={error} setError={setError} />}
          <div className="flex items-center gap-5 justify-end">
            <button
              onClick={() => setAdoptModal(false)}
              className="cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="md:text-lg font-medium py-2 px-8 rounded-lg duration-200 hover:bg-[#1852f2] shadow-md bg-[#1877F2] cursor-pointer"
            >
              Enviar solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionRequest;
