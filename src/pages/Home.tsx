import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";

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
        <Link to="/pet/magnolia-ALWm">Clique aqui</Link>
        <PetCard
          name={"jason"}
          species={"Gato"}
          image={"/jason.jpg"}
          location={"Ipanema, MG"}
          age={"3 anos"}
          gender={"Macho"}
          size={"Pequeno"}
          id={"emerson-jr-yVVr"}
        />
      </main>
    </>
  );
};

export default Home;
