import { FormEvent, useState } from "react";
import FirstStep from "../components/CreatePetSteps/FirstStep";
import SecondStep from "../components/CreatePetSteps/SecondStep";
import ThirdStep from "../components/CreatePetSteps/ThirdStep";
import FourthStep from "../components/CreatePetSteps/FourthStep";
import PetCard from "../components/PetCard";
import { IPet } from "../interfaces/Pet";
import { nanoid } from "nanoid";
import { usePets } from "../hooks/usePets";
import { useImages } from "../hooks/useImages";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";
import { Timestamp } from "firebase/firestore";

const CreatePet = () => {
  const {
    showSuccessNotification,
    username,
    allowContact,
    state,
    city: defaultCity,
    contact: defaultContact,
  } = useUserContext();
  const [step, setStep] = useState(1);
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState(
    defaultCity && state ? `${defaultCity}, ${state}` : ""
  );
  const [city, setCity] = useState(defaultCity ? defaultCity : "");
  const [uf, setUf] = useState(state ? state : "");
  const [contactMethod, setContactMethod] = useState(
    defaultContact && defaultContact.includes("@") ? "Email" : "WhatsApp"
  );
  const [contact, setContact] = useState("");
  const [checked, setChecked] = useState(allowContact);
  const [adoptionQuestions, setAdoptionQuestions] = useState("");
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
  const [moreImagesPreview, setMoreImagesPreview] = useState<string[]>([]);
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [moreImagesData, setMoreImagesData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(false);
  const { createPet } = usePets();
  const { uploadImages } = useImages();
  const navigate = useNavigate();

  const handleNewPet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const result = await uploadImages(imageData, moreImagesData);

    if (!result) return;

    const { image, moreImages } = result;
    const randomId = nanoid(4);

    // normaliza o nome do pet pra gerar a url
    const normalizedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim();

    const petSlug = normalizedName.split(" ").join("-");
    const petId = `${petSlug}-${randomId}`;

    const newPet: IPet = {
      id: petId,
      species,
      name,
      breed,
      gender,
      age,
      size,
      image,

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
      ...(moreImages.length > 0 && { moreImages }),

      owner: username!,

      pendingRequests: 0,
      createdAt: Timestamp.now(),
    };

    await createPet(newPet);

    showSuccessNotification(
      `Tudo certo, que ${
        gender === "Macho" ? "o" : gender === "Fêmea" ? "a" : "o(a)"
      } ${name} conquiste muitos corações! 🎉`
    );
    navigate(`/pet/${petId}`);
  };

  return (
    <>
      <Helmet>
        <title>Cadastrar Pet | Petli</title>
        <meta
          name="description"
          content="Cadastre seu pet e ajude a encontrar um novo lar cheio de amor e cuidado. Contribua para transformar vidas!"
        />
      </Helmet>
      <main className="flex flex-row-reverse w-full max-w-7xl justify-center lg:justify-between mx-auto gap-8 mb-12 md:mb-16">
        <section className="flex-1 h-[720px] min-h-fit px-2 md:px-6">
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
              <div className="h-[2px] bg-bgGray flex-1"></div>
              <div
                className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
                  step === 2 ? "border-secondaryYellow" : ""
                }`}
              >
                2
              </div>
              <div className="h-[2px] bg-bgGray flex-1"></div>
              <div
                className={`rounded-full border-2 size-9 md:size-10 flex justify-center items-center ${
                  step === 3 ? "border-secondaryYellow" : ""
                }`}
              >
                3
              </div>
              <div className="h-[2px] bg-bgGray flex-1"></div>
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
                contact={defaultContact}
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
                handleNewPet={handleNewPet}
                setStep={setStep}
                loading={loading}
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
export default CreatePet;
