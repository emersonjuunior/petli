import { useState, useEffect, FormEvent } from "react";
import { Helmet } from "react-helmet";
import { ISearchPet } from "../interfaces/Pet";
import { usePets } from "../hooks/usePets";

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

const WantAdopt = () => {
  const [states, setStates] = useState<IBGEUF[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [uf, setUf] = useState("all");
  const [city, setCity] = useState("all");
  const [species, setSpecies] = useState("all");
  const [gender, setGender] = useState("all");
  const [size, setSize] = useState("all");
  const [neutered, setNeutered] = useState("all");
  const [currentPage, _] = useState(1);
  const { searchPet } = usePets();

  // busca os estados do brasil com a api do ibge
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((res) => res.json())
      .then((data) => {
        const statesData = data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
        setStates(statesData);
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
      });
  }, [uf]);

  // busca os pets no firestore
  const handleSearchPet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filters: ISearchPet = {
      state: uf,
      city,
      species,
      gender,
      size,
      neutered,
    };

    await searchPet(filters);
  };

  return (
    <>
      <Helmet>
        <title>Quero adotar | Petli</title>
        <meta
          name="description"
          content="Encontre amigos disponíveis para adoção perto de você! Filtre por espécie, porte, gênero e mais. Adote com responsabilidade e transforme uma vida!"
        />
      </Helmet>
      <main className="w-full mx-auto pt-5">
        <section className="w-full border-b-[#404040] border-b-2">
          <div className="flex items-center gap-22 w-full max-w-7xl mx-auto">
            <div className="flex-1">
              <h1 className="text-[32px] font-semibold mb-8">
                Encontre o{" "}
                <span className="text-accentBlue font-bold">melhor amigo</span>{" "}
                perfeito para você!
              </h1>
              <form
                onSubmit={handleSearchPet}
                className="flex flex-col gap-9 mb-10"
              >
                <fieldset className="w-full flex gap-10">
                  <label className="flex-1 flex flex-col gap-3">
                    <span className="text-lg">Espécie</span>
                    <select
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1"
                    >
                      <option value="all">Todas as espécies</option>
                      <option value="Cachorro">Cachorro</option>
                      <option value="Gato">Gato</option>
                    </select>
                  </label>
                  <label className="flex-1 flex flex-col gap-3">
                    <span className="text-lg">Gênero</span>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1"
                    >
                      <option value="all">Todos os gêneros</option>
                      <option value="Macho">Macho</option>
                      <option value="Fêmea">Fêmea</option>
                    </select>
                  </label>
                </fieldset>
                <fieldset className="w-full flex gap-10">
                  <label className="flex-1 flex flex-col gap-3">
                    <span className="text-lg">Estado</span>
                    <select
                      value={uf}
                      onChange={(e) => setUf(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1"
                    >
                      <option value="all">Todos os estados</option>
                      {states.map((state) => (
                        <option value={state.sigla} key={state.sigla}>
                          {state.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex-1 flex flex-col gap-3">
                    <span className="text-lg">Cidade</span>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1"
                    >
                      <option value="all">Todas as cidades</option>
                      {cities.map((city) => (
                        <option value={city.nome} key={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                </fieldset>
                <fieldset className="w-full flex gap-10">
                  <label className="flex-1 flex flex-col gap-3">
                    <span className="text-lg">Porte</span>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1"
                    >
                      <option value="all">Todos os portes</option>
                      <option value="Pequeno">Pequeno</option>
                      <option value="Médio">Médio</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </label>
                  <label className="flex-1 flex flex-col gap-3">
                    <span className="text-lg">Castrado</span>
                    <select
                      value={neutered}
                      onChange={(e) => setNeutered(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1"
                    >
                      <option value="all">Todos</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </label>
                </fieldset>
                <button
                  type="submit"
                  className="text-lg font-medium py-3 rounded-lg duration-200 cursor-pointer bg-primaryRed hover:bg-rose-700 shadow-md mb-3"
                >
                  Buscar
                </button>
              </form>
            </div>
            <div>
              <figure>
                <img
                  src="/adopt-illustration.svg"
                  alt="Ilustração de pets"
                  className="w-[360px] min-w-[360px]"
                />
              </figure>
            </div>
          </div>
        </section>
        <section className="bg-[#292929] pb-40">
          <div className="w-full max-w-7xl mx-auto pt-12">
            <h2 className="text-[42px] font-semibold tracking-widest after:content-[''] after:block after:h-[2px] after:w-40 after:bg-accentBlue mb-8">
              Pets disponíveis
            </h2>
            <div className="grid grid-cols-3 gap-20 mb-11"></div>
            <div className="w-full flex justify-center items-center gap-20">
              <button
                className={`${
                  currentPage === 1
                    ? "opacity-70 text-gray-200 cursor-not-allowed"
                    : "cursor-pointer hover:bg-[#414141] duration-300"
                } w-[240px] py-[10px] text-lg rounded-lg font-medium bg-[#393939] shadow-md`}
              >
                <i className="fa-solid fa-arrow-left mr-1"></i> Página anterior
              </button>
              <button className="w-[240px] py-[10px] text-lg rounded-lg font-medium cursor-pointer bg-[#393939] hover:bg-[#414141] duration-300 shadow-md">
                Próxima página <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default WantAdopt;
