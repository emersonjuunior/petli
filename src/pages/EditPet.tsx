import { useLocation, Navigate } from "react-router-dom";
import { IPet } from "../interfaces/Pet";
import { FormEvent, useState, useEffect } from "react";
import FirstStep from "../components/CreatePetSteps/FirstStep";
import SecondStep from "../components/CreatePetSteps/SecondStep";
import ThirdStep from "../components/CreatePetSteps/ThirdStep";
import FourthStep from "../components/CreatePetSteps/FourthStep";
import PetCard from "../components/PetCard";
import { usePets } from "../hooks/usePets";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";

const EditPet = () => {
  const locationDOM = useLocation();
  const pet = (locationDOM.state as { pet: IPet } | undefined)?.pet;

  if (!pet) {
    return <Navigate to="/minhas-doacoes" />;
  }

  const { username, availablePets } = useUserContext();
  const [step, setStep] = useState(1);
  const [species, setSpecies] = useState(pet.species);
  const [name, setName] = useState(pet.name);
  const [imagePreview, setImagePreview] = useState(pet.image);
  const [breed, setBreed] = useState(pet.breed);
  const [gender, setGender] = useState(pet.gender);
  const [age, setAge] = useState(pet.age);
  const [size, setSize] = useState(pet.size);
  const [location, setLocation] = useState(`${pet.city}, ${pet.state}`);
  const [city, setCity] = useState(pet.city);
  const [uf, setUf] = useState(pet.state);
  const [contactMethod, setContactMethod] = useState(
    pet.contact.includes("@") ? "Email" : "WhatsApp"
  );
  const [contact, setContact] = useState(pet.contact);
  const [checked, setChecked] = useState(pet.allowContact);
  const [adoptionQuestions, setAdoptionQuestions] = useState(
    pet.adoptionQuestions ? pet.adoptionQuestions : ""
  );
  const [vaccinated, setVaccinated] = useState(
    pet.vaccinated ? pet.vaccinated : ""
  );
  const [dewormed, setDewormed] = useState<boolean | null>(
    pet.dewormed ? true : false
  );
  const [neutered, setNeutered] = useState<boolean | null>(
    pet.neutered ? true : false
  );
  const [specialCare, setSpecialCare] = useState(
    pet.specialCare ? pet.specialCare : ""
  );
  const [goodWithOtherAnimals, setGoodWithOtherAnimals] = useState<
    boolean | null
  >(pet.goodWithOtherAnimals ? true : false);
  const [goodWithChildren, setGoodWithChildren] = useState<boolean | null>(
    pet.goodWithChildren ? true : false
  );
  const [description, setDescription] = useState(
    pet.description ? pet.description : ""
  );
  const [moreImagesPreview, setMoreImagesPreview] = useState<string[]>(
    pet.moreImages ? [...pet.moreImages] : []
  );
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [moreImagesData, setMoreImagesData] = useState<FormData[]>([]);
  const { editPet, loading } = usePets();
  const navigate = useNavigate();

  // verifica se o pet sendo editado existe no state
  useEffect(() => {
    const currentPet = availablePets.find((pet) => pet.id === pet.id);

    if (!currentPet) {
      navigate("/minhas-doacoes");
    }
  }, []);

  // lida com a logica de editar pets
  const handleEditPet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedPet: IPet = {
      id: pet.id,
      species,
      name,
      breed,
      gender,
      age,
      size,
      image: imagePreview,

      state: uf,
      city,
      contact,
      allowContact: checked,
      ...(!checked && { adoptionQuestions }),

      ...(vaccinated !== "Nenhuma por enquanto." && { vaccinated }),
      neutered: neutered ? true : false,
      ...(dewormed === true && { dewormed }),
      ...(specialCare !== "Não necessita." && { specialCare }),

      ...(goodWithOtherAnimals === true && { goodWithOtherAnimals }),
      ...(goodWithChildren === true && { goodWithChildren }),
      ...(description !== "" && { description }),
      ...(moreImagesPreview &&
        moreImagesPreview!.length > 0 && { moreImages: moreImagesPreview }),

      owner: username!,

      pendingRequests: pet.pendingRequests,
      createdAt: pet.createdAt,
    };

    await editPet(updatedPet, imageData!, moreImagesData);
  };

  return (
    <>
      <Helmet>
        <title>Editar Pet | Petli</title>
        <meta
          name="description"
          content="Edite as informações de seu pet e ajude a encontrar um novo lar cheio de amor e cuidado. Contribua para transformar vidas!"
        />
      </Helmet>
      <main className="flex flex-row-reverse w-full max-w-7xl justify-center lg:justify-between mx-auto gap-8">
        <section className="flex-1 h-[720px] px-2 md:px-6">
          <div className="min-h-[125px] mb-3 md:mb-0">
            <h1 className="font-medium text-2xl lg:text-3xl mb-6 max-w-[92%] md:max-w-full md:whitespace-nowrap">
              Edite <span className="text-accentBlue">as informações</span> do
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
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setImageData={setImageData}
                timeNumber={pet.age.split("")[0]}
              />
            )}

            {step === 2 && (
              <SecondStep
                setLocation={setLocation}
                city={city}
                setCity={setCity}
                uf={uf}
                setUf={setUf}
                setContact={setContact}
                contactMethod={contactMethod}
                setContactMethod={setContactMethod}
                checked={checked}
                setChecked={setChecked}
                setStep={setStep}
                contact={pet.contact}
                adoptionQuestions={adoptionQuestions}
                setAdoptionQuestions={setAdoptionQuestions}
              />
            )}
            {step === 3 && (
              <ThirdStep
                vaccinated={vaccinated}
                setVaccinated={setVaccinated}
                setNeutered={setNeutered}
                setDewormed={setDewormed}
                specialCare={specialCare}
                setSpecialCare={setSpecialCare}
                setStep={setStep}
                dewormed={dewormed}
                neutered={neutered}
              />
            )}
            {step === 4 && (
              <FourthStep
                name={name}
                setGoodWithOtherAnimals={setGoodWithOtherAnimals}
                setGoodWithChildren={setGoodWithChildren}
                description={description}
                setDescription={setDescription}
                moreImagesPreview={moreImagesPreview}
                setMoreImagesPreview={setMoreImagesPreview}
                setMoreImagesData={setMoreImagesData}
                handleNewPet={handleEditPet}
                setStep={setStep}
                loading={loading}
                goodWithChildren={goodWithChildren}
                goodWithOtherAnimals={goodWithOtherAnimals}
              />
            )}
          </div>
        </section>
        <section className="hidden lg:flex flex-col px-4">
          <div className="h-[125px]"></div>
          <aside
            className="h-[585px] flex flex-col items-center"
            aria-label="Pré-visualização do card do pet sendo cadastrado"
          >
            <h3 className="text-2xl font-medium mb-4 border-b-1 border-[#ddd] px-3">
              Pré-Visualização
            </h3>
            <PetCard
              name={name}
              species={species}
              image={imagePreview}
              location={location}
              age={age}
              gender={gender}
              size={size}
              preview={true}
            />
          </aside>
        </section>
      </main>
    </>
  );
};

export default EditPet;
