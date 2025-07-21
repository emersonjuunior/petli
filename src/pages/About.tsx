import { Helmet } from "react-helmet";
import FirstSection from "../components/About/FirstSection";
import MVV from "../components/About/MVV";
import Info from "../components/About/Info";

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
      <main>
        <FirstSection />
        <MVV />
        <Info />
      </main>
    </>
  );
};

export default About;
