import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { usePets } from "../hooks/usePets";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import PetsSlide from "../components/PetsSlide";
import Faq from "../components/Faq";

const Home = () => {
  const [imgLoad, setImgLoad] = useState(true);
  const { fetchInitialPets, loading } = usePets();

  // busca os pets mais recentes para exibir na home
  useEffect(() => {
    fetchInitialPets();
  }, []);

  if (loading || imgLoad) {
    return (
      <>
        <img
          onLoad={() => {
            setImgLoad(false);
            console.log("Imagem carregada");
          }}
          className="hidden"
          src="/dogs.jpg"
          alt="Imagem de cachorros"
        />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Início | Petli</title>
        <meta
          name="description"
          content="A Petli é o lugar para você encontrar seu novo melhor amigo. O amor não se compra, se adota."
        />
      </Helmet>
      <main className="min-h-[3000px]">
        <Hero />
        <Benefits />
        <PetsSlide />
        <Faq />
      </main>
    </>
  );
};

export default Home;
