import { FormEvent, useEffect, useState } from "react";
import Error from "../Error";
import Checkbox from "../Checkbox";

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  uf: string;
  setUf: React.Dispatch<React.SetStateAction<string>>;
  contactMethod: string;
  setContactMethod: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
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

const SecondStep = ({
  setLocation,
  city,
  setCity,
  uf,
  setUf,
  contactMethod,
  setContactMethod,
  setStep,
}: Props) => {
  const [states, setStates] = useState<IBGEUF[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [contactData, setContactData] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

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

  useEffect(() => {
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

  // altera o state "location" quando uma cidade é selecionada
  const handleSelectedCity = (value: string) => {
    setCity(value);
    setLocation(`${value}, ${uf}`);
  };

  // máscara para input de número de wpp
  const handleInputChange = (value: string) => {
    const raw = value.replace(/\D/g, "").slice(0, 11);
    let formatted = "";

    if (raw.length <= 2) {
      formatted = raw;
    } else if (raw.length <= 7) {
      formatted = `${raw.slice(0, 2)} ${raw.slice(2)}`;
    } else {
      formatted = `${raw.slice(0, 2)} ${raw.slice(2, 7)} ${raw.slice(7)}`;
    }

    setPhone(formatted);
    setContactData(formatted);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setContactData(value);
  };

  // envio de formulario
  const handleSecondStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneRegex = /^\d{2} \d{5} \d{4}$/;
    if (contactMethod === "WhatsApp" && !phoneRegex.test(phone)) {
      setError("Por favor, digite um telefone válido.");
      return;
    }

    setStep(3);
  };

  return (
    <div className="bg-bgGray rounded-lg shadow-lg h-[585px]">
      <h2 className="text-xl md:text-2xl font-medium p-4 md:px-8 md:py-6">
        Como os adotantes poderão te encontrar
      </h2>
      <div className="px-3 md:px-9">
        <div className="w-full h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      </div>
      <form
        onSubmit={handleSecondStep}
        className="px-3 md:px-10 flex flex-col gap-6"
      >
        <div className="px-3 md:px-9 flex flex-col gap-7 md:gap-9 h-[370px]">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-3 px-1">Localização 📍</h3>
            <label>
              <select
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="border-b-2 border-gray-400 w-full h-[34px] px-2 mb-5"
                required
              >
                <option value="" disabled hidden>
                  Selecione o estado
                </option>
                {states.map((state) => (
                  <option value={state.sigla} key={state.sigla}>
                    {state.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                value={city}
                onChange={(e) => handleSelectedCity(e.target.value)}
                className="border-b-2 border-gray-400 w-full h-[34px] px-2 max-h-40 overflow-y-auto"
                required
              >
                <option value="" disabled hidden>
                  Selecione a cidade
                </option>
                {cities.map((city) => (
                  <option value={city.nome} key={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-3 px-1">Contato 📞</h3>
            <div className="flex w-full gap-5 md:gap-10">
              <label className="flex-1">
                <select
                  className="border-b-2 border-gray-400 w-full h-[34px] px-2"
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
              </label>
              <label className="flex-1">
                {contactMethod === "Email" ? (
                  <input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className="border-b-2 border-gray-400 w-full h-[34px] px-2"
                    required
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Seu número"
                    value={phone}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="border-b-2 border-gray-400 w-full h-[34px] px-2"
                    required
                  />
                )}
              </label>
            </div>
          </div>
          <label className="flex items-center space-x-2">
            <Checkbox
              text={
                "Ativando esta opção, seu contato ficará visível na página do pet para qualquer um, facilitando que entrem em contato com você. Caso não ative, os adotantes poderão enviar uma solicitação de adoção pela plataforma, e você decidirá quem poderá ver seus dados de contato."
              }
              checked={checked}
              setChecked={setChecked}
            />
          </label>
        </div>
        <div className="w-full h-[.5px] bg-[#555252] mx-auto"></div>
        <div
          className={`flex w-full items-center mb-5 h-[50px] ${
            error ? "justify-between" : "justify-end"
          }`}
        >
          {error && <Error error={error} setError={setError} />}
          <div className="flex gap-4 md:gap-6 items-center">
            <span
              className="font-light cursor-pointer"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Voltar
            </span>
            <button
              type="submit"
              className="font-medium text-lg bg-[#614cfc] px-8 h-[45px] rounded-xl cursor-pointer duration-200 hover:bg-[#614cfcda]"
            >
              Avançar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
