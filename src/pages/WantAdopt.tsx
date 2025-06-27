import { useState, useEffect, FormEvent } from "react";
import { Helmet } from "react-helmet";
import { ISearchPet } from "../interfaces/Pet";
import { usePets } from "../hooks/usePets";
import { usePetContext } from "../context/PetContext";
import Loading from "../components/Loading";
import PetCard from "../components/PetCard";
import loadingGif from "../assets/search-loading.json";
import Lottie from "lottie-react";
import NoPets from "../components/NoPets";
import Error from "../components/Error";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersActive, setFiltersActive] = useState(false);
  const {
    searchPets,
    fetchInitialPets,
    loading,
    searchPetsLoad,
    loadNextPage,
    loadPrevPage,
    error,
    setError,
  } = usePets();
  const { displayPets } = usePetContext();

  // verifica se o botão das paginas ficarão ativos
  const nextPageActive = displayPets.length === 6;
  const prevPageActive = currentPage === 1;

  // busca os pets mais recentes para exibir na home
  useEffect(() => {
    fetchInitialPets();
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

  if (loading) {
    return <Loading />;
  }

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

    await searchPets(filters);
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
      <main className="w-full mx-auto pt-2 md:pt-5">
        <section className="w-full border-b-[#404040] border-b-3 shadow-xl md:px-3 xl:px-0">
          <div className="flex items-center md:gap-8 lg:gap-16 xl:gap-20 w-full max-w-7xl mx-auto">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl xl:text-[32px] font-semibold mb-4 md:mb-6 xl:mb-8 px-3 md:px-0">
                Encontre o{" "}
                <span className="text-accentBlue font-bold">melhor amigo</span>{" "}
                perfeito para você!
              </h1>
              <form
                onSubmit={handleSearchPet}
                className="flex flex-col md:gap-9 mb-10"
              >
                <div className={`${filtersActive ? "max-h-[528px]" : "max-h-[45px] overflow-y-hidden"} overflow-hidden duration-500 ease-in-out transition-[max-height] flex flex-col md:gap-9 bg-bgGray md:bg-[#262626] px-3 md:p-0 border-[#404040] border-t-1 border-b-2 shadow-md md:border-0 md:shadow-none`}>
                  <div
                    onClick={() => setFiltersActive((prev) => !prev)}
                    className={`md:hidden min-h-[45px] flex items-center justify-between cursor-pointer`}
                  >
                    <h2 className="text-xl font-semibold">Filtros</h2>
                    <i className={`fa-solid fa-caret-down`}></i>
                  </div>
                  <fieldset className="w-full flex flex-col md:flex-row gap-5 md:gap-10 mb-5 md:mb-0">
                    <label className="flex-1 flex flex-col gap-2 md:gap-3">
                      <span className="md:text-lg">Espécie</span>
                      <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1 text-sm md:text-base"
                      >
                        <option value="all">Todas as espécies</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                      </select>
                    </label>
                    <label className="flex-1 flex flex-col gap-2 md:gap-3">
                      <span className="md:text-lg">Gênero</span>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1 text-sm md:text-base"
                      >
                        <option value="all">Todos os gêneros</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                      </select>
                    </label>
                  </fieldset>
                  <fieldset className="w-full flex flex-col md:flex-row gap-5 md:gap-10 mb-5 md:mb-0">
                    <label className="flex-1 flex flex-col gap-2 md:gap-3">
                      <span className="md:text-lg">Estado</span>
                      <select
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                        className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1 text-sm md:text-base"
                      >
                        <option value="all">Todos os estados</option>
                        {states.map((state) => (
                          <option value={state.sigla} key={state.sigla}>
                            {state.nome}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex-1 flex flex-col gap-2 md:gap-3">
                      <span className="md:text-lg">Cidade</span>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1 text-sm md:text-base"
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
                  <fieldset className="w-full flex flex-col md:flex-row gap-5 md:gap-10 mb-5 md:mb-0">
                    <label className="flex-1 flex flex-col gap-2 md:gap-3">
                      <span className="md:text-lg">Porte</span>
                      <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1 text-sm md:text-base"
                      >
                        <option value="all">Todos os portes</option>
                        <option value="Pequeno">Pequeno</option>
                        <option value="Médio">Médio</option>
                        <option value="Grande">Grande</option>
                      </select>
                    </label>
                    <label className="flex-1 flex flex-col gap-2 md:gap-3">
                      <span className="md:text-lg">Castrado</span>
                      <select
                        value={neutered}
                        onChange={(e) => setNeutered(e.target.value)}
                        className="border-b-2 border-gray-400 focus:border-[#596A95] pb-1 text-sm md:text-base"
                      >
                        <option value="all">Todos</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                      </select>
                    </label>
                  </fieldset>
                </div>
                <button
                  type="submit"
                  disabled={searchPetsLoad}
                  className={`${
                    searchPetsLoad
                      ? "cursor-progress bg-rose-700"
                      : "cursor-pointer bg-primaryRed"
                  } text-lg font-medium py-3 rounded-lg duration-20 hover:bg-rose-700 shadow-md mt-3`}
                >
                  {searchPetsLoad ? "Buscando..." : "Buscar"}
                </button>
                <Error error={error} setError={setError} />
              </form>
            </div>
            <div>
              <figure>
                <img
                  src="/adopt-illustration.svg"
                  alt="Ilustração de pets"
                  className="hidden md:block md:w-[324px] md:min-w-[324px] xl:w-[360px] xl:min-w-[360px]"
                />
              </figure>
            </div>
          </div>
        </section>
        <section className="bg-[#282828] pb-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.25)] px-3 xl:px-0">
          <div className="w-full max-w-7xl mx-auto pt-12">
            <h2 className="text-[42px] font-semibold tracking-widest after:content-[''] after:block after:h-[3px] after:w-40 after:bg-accentBlue mb-8">
              Pets disponíveis
            </h2>
            {searchPetsLoad ? (
              <Lottie
                animationData={loadingGif}
                className="w-md min-w-md mx-auto"
              />
            ) : (
              <div className="grid grid-cols-3 gap-18 mb-11">
                {displayPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    id={pet.id}
                    name={pet.name}
                    species={pet.species}
                    image={pet.image}
                    location={`${pet.city}, ${pet.state}`}
                    age={pet.age}
                    size={pet.size}
                    gender={pet.gender}
                  />
                ))}
              </div>
            )}
            {!searchPetsLoad && displayPets.length === 0 && (
              <div className="mb-3">
                <NoPets
                  small="true"
                  text="Nenhum pet disponível com os filtros aplicados. Tente alterar os filtros para ampliar a busca!"
                />
              </div>
            )}
            <div className="w-full flex justify-center items-center gap-20">
              <button
                disabled={prevPageActive}
                onClick={() => {
                  loadPrevPage(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }}
                className={`${
                  prevPageActive
                    ? "opacity-60 bg-[#363636] text-gray-400 cursor-not-allowed"
                    : "cursor-pointer hover:bg-[#414141] duration-300"
                } w-[240px] py-[10px] text-lg rounded-lg font-medium bg-[#393939] shadow-md`}
              >
                <i className="fa-solid fa-arrow-left mr-1"></i> Página anterior
              </button>
              <button
                disabled={!nextPageActive}
                onClick={() => {
                  loadNextPage(currentPage + 1);
                  setCurrentPage(currentPage + 1);
                }}
                className={`${
                  !nextPageActive
                    ? "opacity-60 bg-[#363636] text-gray-400 cursor-not-allowed"
                    : "cursor-pointer hover:bg-[#414141] duration-300"
                } w-[240px] py-[10px] text-lg rounded-lg font-medium bg-[#393939] shadow-md`}
              >
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
