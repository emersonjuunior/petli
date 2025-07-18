import { Helmet } from "react-helmet";
import { useEffect, useState, lazy, Suspense } from "react";
import { usePets } from "../hooks/usePets";
import Loading from "../components/Loading";

const Home = () => {
  const [imgLoad, setImgLoad] = useState(true);
  const { fetchInitialPets, loading } = usePets();
  const Hero = lazy(() => import("../components/Home/Hero"));
  const Benefits = lazy(() => import("../components/Home/Benefits"));
  const PetsSlide = lazy(() => import("../components/Home/PetsSlide"));
  const Faq = lazy(() => import("../components/Home/Faq"));

  // busca os pets mais recentes para exibir na home
  useEffect(() => {
    fetchInitialPets();
  }, []);

  if (loading || imgLoad) {
    return (
      <>
        <img
          onLoad={() => setImgLoad(false)}
          className="w-0 h-0 opacity-0"
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
      <main>
        <Suspense fallback={<Loading />}>
          <Hero />
          <Benefits />
          <PetsSlide />
          <Faq />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
