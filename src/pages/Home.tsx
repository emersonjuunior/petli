import PetCard from "../components/PetCard";

const Home = () => {

  return (
    <div>
      <PetCard
        name="Jason"
        species="Gato"
        image="./jason.jpg"
        location="Ipanema, MG"
        age="3 anos"
        gender="Macho"
        size="Pequeno"
      />
    
    </div>
  );
};

export default Home;
