import { useState } from "react";
import FirstStep from "../components/CreatePetSteps/FirstStep";
import SecondStep from "../components/CreatePetSteps/SecondStep";
import ThirdStep from "../components/CreatePetSteps/ThirdStep";
import PetCard from "../components/PetCard";

const CreatePet = () => {
  const [step, setStep] = useState(2);
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [contact, setContact] = useState("");

  return (
    <main className="flex flex-row-reverse w-full max-w-7xl justify-center lg:justify-between mx-auto gap-8 items-center">
      <section className="flex-1 h-[700px] px-6">
        <h1 className="font-medium text-xl md:text-3xl mb-6">
          Encontre um <span className="text-accentBlue">novo lar</span> para seu
          pet 🐾
        </h1>
        <div className="flex items-center mb-6 gap-1 md:gap-2">
          <div
            className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
              step === 1 ? "border-secondaryYellow" : ""
            }`}
          >
            1
          </div>
          <div className="h-[2px] bg-bgGray w-12 md:w-30 xl:w-40"></div>
          <div
            className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
              step === 2 ? "border-secondaryYellow" : ""
            }`}
          >
            2
          </div>
          <div className="h-[2px] bg-bgGray w-12 md:w-30 xl:w-40"></div>
          <div
            className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
              step === 3 ? "border-accentBlue" : ""
            }`}
          >
            3
          </div>
          <div className="h-[2px] bg-bgGray w-12 md:w-30 xl:w-40"></div>
          <div
            className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
              step === 4 ? "border-accentBlue" : ""
            }`}
          >
            4
          </div>
        </div>
        <div>
          {step === 1 && (
            <FirstStep
              setStep={setStep}
              species={species}
              setSpecies={setSpecies}
              name={name}
              setName={setName}
              breed={breed}
              setBreed={setBreed}
              gender={gender}
              setGender={setGender}
              setAge={setAge}
              size={size}
              setSize={setSize}
              image={image}
              setImage={setImage}
            />
          )}
          {step === 2 && (
            <SecondStep
              location={location}
              setLocation={setLocation}
              city={city}
              setCity={setCity}
              uf={uf}
              setUf={setUf}
              contactMethod={contactMethod}
              setContactMethod={setContactMethod}
              contact={contact}
              setContact={setContact}
              setStep={setStep}
            />
          )}
          {step === 3 && <ThirdStep />}
        </div>
      </section>

      <section className="hidden lg:block px-4">
        <PetCard
          name={name}
          species={species}
          image={image}
          location={location}
          age={age}
          gender={gender}
          size={size}
        />
      </section>
    </main>
  );
};

export default CreatePet;
