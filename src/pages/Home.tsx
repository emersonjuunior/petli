import { Helmet } from "react-helmet";
import Hero from "../components/Hero";

const Home = () => {
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
      </main>
    </>
  );
};

export default Home;
