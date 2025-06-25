import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePets } from "../hooks/usePets";
import Loading from "../components/Loading";

const Home = () => {
  const { fetchInitialPets, loading } = usePets();

  // busca os pets mais recentes para exibir na home
  useEffect(() => {
    fetchInitialPets();
  }, []);

  if (loading) {
    return <Loading />;
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
        <Link to="/emersonjr">Clique aqui</Link>

        <Hero />
      </main>
    </>
  );
};

export default Home;
