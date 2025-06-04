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
  setContact: React.Dispatch<React.SetStateAction<string>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  adoptionQuestions: string;
  setAdoptionQuestions: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  contact: string;
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
  setContact,
  contactMethod,
  setContactMethod,
  checked,
  setChecked,
  setStep,
  contact,
  adoptionQuestions,
  setAdoptionQuestions,
}: Props) => {
  const [states, setStates] = useState<IBGEUF[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState(
    contact && !contact.includes("@") ? contact : ""
  );
  const [email, setEmail] = useState(
    contact && contact.includes("@") ? contact : ""
  );

  // atualiza o state do contato ao renderizar o componente
  useEffect(() => {
    setContact(contact);
  }, []);

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

  // limpa o input de adoptionRequests, se mudar o valor de allowContact
  useEffect(() => {
    if (checked) {
      setAdoptionQuestions("");
    }
  }, [checked]);

  // altera o state quando uma cidade é selecionada
  const handleSelectedCity = (value: string) => {
    setCity(value);
    setLocation(`${value}, ${uf}`);
  };

  // altera o state quando uma uf é selecionada
  const handleSelectedUf = (value: string) => {
    setUf(value);
    setCity("");
    setLocation("");
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
    setContact(formatted);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setContact(value);
  };

  // envio de formulario
  const handleSecondStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verifica se é um número de celular válido
    const phoneRegex = /^\d{2} \d{5} \d{4}$/;
    if (contactMethod === "WhatsApp" && !phoneRegex.test(phone)) {
      setError("Por favor, digite um telefone válido.");
      return;
    }

    // verifica se é um email válido
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (contactMethod === "Email" && !emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!checked && adoptionQuestions === "") {
      setError("Por favor, escreva perguntas para o adotante.");
      return;
    }

    setStep(3);
  };

  return (
    <section className="bg-bgGray rounded-lg shadow-lg h-[585px] min-h-fit">
      <h2 className="text-xl md:text-2xl font-medium p-4 md:px-8 md:py-6">
        Como os adotantes poderão te encontrar
      </h2>
      <div className="px-3 md:px-7">
        <div className="w-full h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      </div>
      <form
        onSubmit={handleSecondStep}
        className="px-3 md:px-10 flex flex-col gap-4 md:gap-6"
      >
        <div className="px-3 md:px-9 flex flex-col gap-3 md:gap-5 min-h-fit">
          <div className="flex flex-col">
            <fieldset>
              <legend className="text-lg font-medium mb-2 px-1">
                Localização 📍
              </legend>
              <div className="flex w-full gap-5 md:gap-10">
                <label className="flex-1">
                  <select
                    value={uf}
                    onChange={(e) => handleSelectedUf(e.target.value)}
                    className="border-b-2 border-gray-400 w-full h-[34px] px-2 mb-2"
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
                <label className="flex-1">
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
            </fieldset>
          </div>
          <fieldset className="flex flex-col">
            <legend className="text-lg font-medium mb-2 px-1">
              Contato 📞
            </legend>
            <div className="flex w-full gap-5 md:gap-10">
              <label className="flex-1">
                <select
                  className="border-b-2 border-gray-400 w-full h-[34px] px-2 mb-2"
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
                    maxLength={70}
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
          </fieldset>
          <label className="flex items-center">
            <Checkbox
              title="Manter contato visível?"
              text={
                "Se ativado, seu contato ficará visível a todos os interessados, permitindo contato direto. Caso contrário, os adotantes enviarão solicitações de adoção pela plataforma, e você decidirá com quem compartilhar seu contato."
              }
              checked={checked}
              setChecked={setChecked}
            />
          </label>
          <fieldset className="relative">
            <legend className="mb-1">Perguntas para adotantes 🐾</legend>
            <textarea
              disabled={checked}
              className={`w-full min-h-[115px] max-h-[115px] border-1 rounded-lg outline-none text-sm p-2 ${
                !checked
                  ? "border-gray-400 focus:border-[#596A95]"
                  : "text-gray-100 border-gray-300 cursor-not-allowed opacity-20 font-medium"
              }`}
              maxLength={300}
              placeholder={
                checked
                  ? "Como seu contato está visível, não é necessário criar perguntas."
                  : "Adicione perguntas que os adotantes deverão responder na solicitação. Isso te ajuda a conhecer melhor quem deseja adotar."
              }
              value={adoptionQuestions}
              onChange={(e) => setAdoptionQuestions(e.target.value)}
            ></textarea>
            <p className="absolute bottom-3 right-3 font-medium bg-bgBlack/20 rounded-lg p-[1px] ">
              {adoptionQuestions.length}/300
            </p>
          </fieldset>
        </div>
        <div className="w-full h-[.5px] bg-[#555252] mx-auto"></div>
        <div
          className={`flex w-full items-center h-[50px] mb-3 gap-1 ${
            error ? "justify-between" : "justify-end"
          }`}
        >
          {error && <Error error={error} setError={setError} />}
          <div className="flex gap-2 md:gap-6 items-center">
            <span
              className="text-sm md:text-base font-light cursor-pointer"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Voltar
            </span>
            <button
              type="submit"
              className="font-medium sm:text-lg bg-[#614cfc] px-3 sm:px-8 h-[35px] sm:h-[45px] rounded-xl cursor-pointer duration-200 hover:bg-[#614cfcda]"
            >
              Avançar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SecondStep;
