import { Helmet } from "react-helmet";
import FirstSection from "../components/About/FirstSection";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Sobre | Petli</title>
        <meta
          name="description"
          content="Petli é uma plataforma de adoção de animais que conecta pessoas com pets em busca de um novo lar."
        />
      </Helmet>
      <main className="min-h-[2000px]">
        <FirstSection />
      </main>
    </>
  );
};

export default About;
