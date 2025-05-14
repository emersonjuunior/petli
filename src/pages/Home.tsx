import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PetSummary from "../components/PetSummary";

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
        <h1>Home</h1>
        <Link to="/vitoria">Clique aqui</Link>
        <div className="w-full flex justify-center">
          <PetSummary name="Jason" image="/jason.jpg" date="07/05/2025" />
        </div>
      </main>
    </>
  );
};

export default Home;
