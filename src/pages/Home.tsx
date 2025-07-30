import { Helmet } from "react-helmet";
import { useEffect, useState, lazy, Suspense } from "react";
import { usePets } from "../hooks/usePets";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
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

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Dar um pequeno delay opcional pra garantir que o DOM esteja carregado
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

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
