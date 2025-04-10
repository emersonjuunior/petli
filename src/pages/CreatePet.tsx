import { FormEvent, useState } from "react";
import FirstStep from "../components/CreatePetSteps/FirstStep";
import SecondStep from "../components/CreatePetSteps/SecondStep";
import ThirdStep from "../components/CreatePetSteps/ThirdStep";
import FourthStep from "../components/CreatePetSteps/FourthStep";
import PetCard from "../components/PetCard";
import { IPet } from "../interfaces/Pet";
import { nanoid } from "nanoid";
import { usePets } from "../hooks/usePets";

const CreatePet = () => {
  const [step, setStep] = useState(1);
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
  const [checked, setChecked] = useState(false);
  const [vaccinated, setVaccinated] = useState("");
  const [dewormed, setDewormed] = useState<boolean | null>(null);
  const [neutered, setNeutered] = useState<boolean | null>(null);
  const [specialCare, setSpecialCare] = useState("");
  const [goodWithOtherAnimals, setGoodWithOtherAnimals] = useState<
    boolean | null
  >(null);
  const [goodWithChildren, setGoodWithChildren] = useState<boolean | null>(
    null
  );
  const [description, setDescription] = useState("");
  const [moreImages, setMoreImages] = useState<string[]>([]);
  const { createPet } = usePets();

  const handleNewPet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPet: IPet = {
      id: nanoid(10),
      species,
      name,
      breed,
      gender,
      age,
      size,
      image,

      state: uf,
      city,
      contactMethod,
      contact,
      approved: checked,

      ...(vaccinated !== "" && { vaccinated }),
      ...(neutered === true && { neutered }),
      ...(dewormed === true && { dewormed }),
      ...(specialCare !== "" && { specialCare }),

      ...(goodWithOtherAnimals === true && { goodWithOtherAnimals }),
      ...(goodWithChildren === true && { goodWithChildren }),
      ...(description !== "" && { description }),
      ...(moreImages.length > 0 && { moreImages }),
    };

    createPet(newPet);
  };

  return (
    <main className="flex flex-row-reverse w-full max-w-7xl justify-center lg:justify-between mx-auto gap-8 ">
      <section className="flex-1 h-[720px] px-2 md:px-6">
        <div className="min-h-[125px] mb-3 md:mb-0">
          <h1 className="font-medium text-2xl lg:text-3xl mb-6 max-w-[92%] md:max-w-full md:whitespace-nowrap">
            Encontre um <span className="text-accentBlue">novo lar</span> para
            seu pet 🐾
          </h1>
          <div className="flex items-center gap-1 md:gap-2">
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
                step === 3 ? "border-secondaryYellow" : ""
              }`}
            >
              3
            </div>
            <div className="h-[2px] bg-bgGray w-12 md:w-30 xl:w-40"></div>
            <div
              className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
                step === 4 ? "border-secondaryYellow" : ""
              }`}
            >
              4
            </div>
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
              setLocation={setLocation}
              city={city}
              setCity={setCity}
              uf={uf}
              setUf={setUf}
              contact={contact}
              setContact={setContact}
              contactMethod={contactMethod}
              setContactMethod={setContactMethod}
              checked={checked}
              setChecked={setChecked}
              setStep={setStep}
            />
          )}
          {step === 3 && (
            <ThirdStep
              vaccinated={vaccinated}
              setVaccinated={setVaccinated}
              neutered={neutered}
              setNeutered={setNeutered}
              dewormed={dewormed}
              setDewormed={setDewormed}
              specialCare={specialCare}
              setSpecialCare={setSpecialCare}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <FourthStep
              name={name}
              goodWithOtherAnimals={goodWithOtherAnimals}
              setGoodWithOtherAnimals={setGoodWithOtherAnimals}
              goodWithChildren={goodWithChildren}
              setGoodWithChildren={setGoodWithChildren}
              description={description}
              setDescription={setDescription}
              moreImages={moreImages}
              setMoreImages={setMoreImages}
              handleNewPet={handleNewPet}
              setStep={setStep}
            />
          )}
        </div>
      </section>

      <section className="hidden lg:flex flex-col px-4 ">
        <div className="h-[125px]"></div>
        <aside
          className="h-[585px] flex items-center"
          aria-label="Pré-visualização do card do pet sendo cadastrado"
        >
          <PetCard
            name={name}
            species={species}
            image={image}
            location={location}
            age={age}
            gender={gender}
            size={size}
          />
        </aside>
      </section>
    </main>
  );
};

export default CreatePet;
