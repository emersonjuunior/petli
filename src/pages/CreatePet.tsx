import { useState } from "react";
import FirstStep from "../components/CreatePetSteps/FirstStep";
import PetCard from "../components/PetCard";

const CreatePet = () => {
  const [step, setStep] = useState(1);
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  return (
    <main className="flex flex-row-reverse w-full max-w-7xl justify-between mx-auto gap-8 items-center">
      <section className="flex-2  h-[700px] px-4">
        <h1 className="font-medium text-xl md:text-3xl mb-6">
          Encontre um <span className="text-accentBlue">novo lar</span> para seu
          pet 🐾
        </h1>
        <div className="flex items-center mb-6 gap-2">
          <div
            className={`rounded-full border-2 size-10 flex justify-center items-center ${
              step === 1 ? "border-secondaryYellow" : ""
            }`}
          >
            1
          </div>
          <div className="h-[2px] bg-bgGray w-40"></div>
          <div
            className={`rounded-full border-2 border-gray-300 size-10 flex justify-center items-center ${
              step === 2 ? "border-accentBlue" : ""
            }`}
          >
            2
          </div>
          <div className="h-[2px] bg-bgGray w-40"></div>
          <div
            className={`rounded-full border-2 size-10 flex justify-center items-center ${
              step === 3 ? "border-accentBlue" : ""
            }`}
          >
            3
          </div>
          <div className="h-[2px] bg-bgGray w-40"></div>
          <div
            className={`rounded-full border-2 size-10 flex justify-center items-center ${
              step === 4 ? "border-accentBlue" : ""
            }`}
          >
            4
          </div>
        </div>
        <div>
          {step === 1 && (
            <FirstStep
              species={species}
              setSpecies={setSpecies}
              name={name}
              setName={setName}
              breed={breed}
              setBreed={setBreed}
              gender={gender}
              setGender={setGender}
              age={age}
              setAge={setAge}
              size={size}
              setSize={setSize}
              image={image}
              setImage={setImage}
            />
          )}
        </div>
      </section>

      <section>
        <PetCard
          name={name}
          species={species}
          image="./jason.jpg"
          location="Ipanema, MG"
          age="3 anos"
          gender="Macho"
          size="Pequeno"
        />
      </section>
    </main>
  );
};

export default CreatePet;
