import { Helmet } from "react-helmet";
import { useUserContext } from "../context/UserContext";
import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import Error from "../components/Error";
import { useEditProfile } from "../hooks/useEditProfile";

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

const EditProfile = () => {
  const { displayName, userImage, username } = useUserContext();
  const { editProfile } = useEditProfile();
  const [newDisplayName, setNewDisplayName] = useState(
    displayName ? displayName : ""
  );
  const [profileImage, setProfileImage] = useState(
    userImage ? userImage : "/no-user.webp"
  );
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [checked, setChecked] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [uf, setUf] = useState("");
  const [states, setStates] = useState<IBGEUF[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);

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

  // altera o state quando uma cidade é selecionada
  const handleSelectedCity = (value: string) => {
    setCity(value);
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

  // lógica de envio do formulário de editar perfil
  const handleEditProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if ((city === "" && uf != "") || (city != "" && uf === "")) {
      setError("Por favor, preencha a localização corretamente.");
      return;
    }

    // verifica se é um número de celular válido
    const phoneRegex = /^\d{2} \d{5} \d{4}$/;
    if (
      contactMethod === "WhatsApp" &&
      !phoneRegex.test(phone) &&
      phone != ""
    ) {
      setError("Por favor, digite um telefone válido.");
      return;
    }

    // verifica se é um email válido
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (contactMethod === "Email" && !emailRegex.test(email) && email != "") {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    const updatedUser = {
        displayName: newDisplayName,
        userImage: profileImage,
        about,
        city,
        state: uf,
        contact,
        allowContact: checked
    }

    editProfile(updatedUser);

    console.log("Formulário enviado.");
  };

  return (
    <>
      <Helmet>
        <title>Editar Perfil | Petli</title>
        <meta
          name="description"
          content="Altere as informações da sua conta."
        />
      </Helmet>
      <main>
        <form
          onSubmit={handleEditProfile}
          className="w-full max-w-7xl mx-auto px-2 md:px-4 flex gap-10"
        >
          <section className="flex flex-col gap-5 px-2 basis-[330px]">
            <div className="size-75 rounded-full relative">
              <img
                src={profileImage}
                alt={`Foto de Perfil do Usuário ${username}`}
                className="size-75 rounded-full"
              />
              <div className="size-75 rounded-full absolute bg-black/60 cursor-pointer hover:bg-black/50 duration-300 top-0 flex items-center justify-center">
                <p className="font-medium text-2xl max-w-8/10 text-center">
                  Alterar Foto de Perfil{" "}
                  <i className="fa-solid fa-pen-to-square ml-1"></i>
                </p>
                <input
                  type="file"
                  className="absolute size-75 rounded-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <hr className="text-[#424242]" />
            <fieldset className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-lg">Nome de Usuário</span>
                <input
                  type="text"
                  value={username!}
                  readOnly
                  className="w-full px-1 cursor-not-allowed opacity-50 focus:border-gray-400"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-lg">Nome completo</span>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="w-full px-1"
                  minLength={8}
                  maxLength={50}
                  required
                />
              </label>
            </fieldset>
          </section>
          <section className="flex-1 flex flex-col gap-8 border-1 border-[#424242] rounded-2xl p-8">
            <h1 className="text-3xl font-medium">Editar Perfil</h1>
            <hr className="text-[#424242]" />
            <fieldset className="">
              <legend className="text-2xl font-medium mb-3">
                Nos conte mais sobre você
              </legend>
              <div className="relative">
                <textarea
                  className="w-full border-[#404040] border-2 rounded-lg min-h-[190px] max-h-[190px] px-4 py-3 focus:border-[#606060] outline-none"
                  maxLength={300}
                  value={about}
                  placeholder="Nada informado."
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
                <p className="absolute bottom-3 right-3">{about.length}/300</p>
              </div>
            </fieldset>
            <hr className="text-[#424242]" />
            <fieldset>
              <legend className="text-2xl font-medium mb-3">
                Localização 📍
              </legend>
              <label>
                <select
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="border-b-2 border-gray-400 w-full h-[34px] px-1 mb-5"
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
                  className="border-b-2 border-gray-400 w-full h-[34px] px-1 max-h-40 overflow-y-auto"
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
            </fieldset>
            <hr className="text-[#424242]" />
            <fieldset className="flex flex-col">
              <legend className="text-2xl font-medium mb-3">Contato 📞</legend>
              <div className="flex w-full gap-5 md:gap-10">
                <label className="flex-1">
                  <select
                    className="border-b-2 border-gray-400 w-full h-[34px] px-1"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
                </label>
                <label className="flex-1 mb-5">
                  {contactMethod === "Email" ? (
                    <input
                      type="email"
                      placeholder="Seu email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className="border-b-2 border-gray-400 w-full h-[34px] px-1"
                      maxLength={70}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Seu número"
                      value={phone}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="border-b-2 border-gray-400 w-full h-[34px] px-2"
                    />
                  )}
                </label>
              </div>
              <label className="flex items-center space-x-2">
                <Checkbox
                  title="Manter contato visível?"
                  text={
                    "Se ativado, seu contato ficará visível a todos os interessados, permitindo contato direto. Caso contrário, os adotantes enviarão solicitações pela plataforma, e você decidirá com quem compartilhar seu contato."
                  }
                  checked={checked}
                  setChecked={setChecked}
                />
              </label>
            </fieldset>

            <hr className="text-[#424242]" />
            <p className="text-sm">
              {" "}
              <strong>Obs:</strong> as alterações de contato e localização não
              serão aplicadas aos pets já cadastrados. Se quiser atualizar essas
              informações nos pets existentes, será necessário editá-los
              individualmente.
            </p>
            <div
              className={`flex w-full items-center h-[50px] gap-1 ${
                error ? "justify-between" : "justify-end"
              }`}
            >
              {error && <Error error={error} setError={setError} />}
              <div className="flex items-center justify-end gap-3">
                <Link to={`/${username}`}>Voltar</Link>
                <button
                  type="submit"
                  className="bg-primaryRed px-5 py-2 rounded-lg text-lg font-medium hover:bg-rose-700 duration-300 cursor-pointer"
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </section>
        </form>
      </main>
    </>
  );
};

export default EditProfile;
