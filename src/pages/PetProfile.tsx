import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";
import PetCard from "../components/PetCard";
import { Link } from "react-router-dom";

const PetProfile = () => {
  const { petId } = useParams();
  const { pet, loading } = useGetProfile("pets", petId!);

  if (loading) {
    return <Loading />;
  }

  if (pet === null) {
    return <Navigate to="*" />;
  }

  return (
    <main className="w-full">
      <div className="w-full max-w-7xl mx-auto">
        <section className="flex items-center">
          <div className="flex-1 h-[500px] overflow-hidden flex items-center justify-center rounded-4xl">
            <img
              loading="lazy"
              src={pet.image.url}
              alt={`Foto do Pet ${pet.name}`}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex-1 flex items-center px-12 md:px-20 lg:px-24 h-[500px] min-h-fit relative">
            <div className="flex flex-col w-full justify-center h-fit">
              <h1 className="font-medium text-3xl md:text-6xl mb-3">
                {pet.name}
              </h1>
              <p className="text-xl mb-4">
                <i className="fa-solid fa-map-pin text-[#bebaba] mr-1"></i>{" "}
                {pet.city}, {pet.state}
              </p>
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-40 text-xl">
                  <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                    Espécie
                  </p>
                  <span>{pet.species}</span>
                </div>
                <div className="flex items-center gap-40 text-xl">
                  <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                    Raça
                  </p>
                  <span>{pet.breed}</span>
                </div>
                <div className="flex items-center gap-40 text-xl">
                  <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                    Gênero
                  </p>
                  <span>{pet.gender}</span>
                </div>
                <div className="flex items-center gap-40 text-xl">
                  <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                    Idade
                  </p>
                  <span>{pet.age}</span>
                </div>
                <div className="flex items-center gap-40 text-xl">
                  <p className="bg-primaryRed w-[100px] text-center rounded-lg py-1">
                    Estatura
                  </p>
                  <span>{pet.size}</span>
                </div>
              </div>
              <div className="absolute bottom-0 text-lg flex gap-2">
                {" "}
                <p className="font-medium">Responsável: </p>
                <Link to={`/${pet.owner}`}>
                  <span className="font-light underline">{pet.owner}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <hr className="text-[#404040] mt-4 mb-8" />
        <div className="w-full flex flex-col gap-10">
          <section className="w-full border-2 border-[#404040] rounded-xl px-20 py-10 flex flex-col gap-5 shadow-md relative">
            <h2 className="text-xl md:text-2xl font-medium mb-2 absolute -top-4 left-18 px-2 bg-bgBlack">
              Cuidados e Saúde 🩺
            </h2>
            <div className="flex gap-4">
              <div className="w-1/2 flex flex-col gap-1">
                <h3 className="text-lg font-medium">
                  O bichinho já tomou alguma vacina?
                </h3>
                <p className="break-words font-light">{pet.vaccinated}</p>
              </div>
              <div className="w-1/2 flex flex-col gap-1">
                <h3 className="text-lg font-medium">
                  Necessita de cuidados especiais?
                </h3>
                <p className="break-words font-light">{pet.specialCare}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 w-1/2">
                <h3 className="text-lg font-medium">Castrado?</h3>
                <p className="font-light">{pet.neutered ? "Sim" : "Não"}</p>
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <h3 className="text-lg font-medium">Vermifugado?</h3>
                <p className="font-light">{pet.dewormed ? "Sim" : "Não"}</p>
              </div>
            </div>
          </section>
          <section className="w-full border-2 border-[#404040] rounded-xl px-20 py-10 flex flex-col gap-5 shadow-md relative">
            <h2 className="text-xl md:text-2xl font-medium mb-2 absolute -top-4 left-18 px-2 bg-bgBlack">
              Personalidade 🐾
            </h2>
            <div className="flex">
              <div className="flex flex-col gap-1 w-1/2">
                <h3 className="text-lg font-medium">
                  Mais detalhes sobre {pet.name}:
                </h3>
                <p className="break-words font-light">
                  {pet.description ? pet.description : "Nada informado."}
                </p>
              </div>
              <div className="flex flex-col gap-5 w-1/2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium">
                    Se dá bem com outros animais?
                  </h3>
                  <p className="font-light">
                    {pet.goodWithOtherAnimals ? "Sim" : "Não"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium">
                    Se dá bem com crianças?
                  </h3>
                  <p className="font-light">
                    {pet.goodWithChildren ? "Sim" : "Não"}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <hr className="text-[#404040] mb-8" />
        </div>
        <section className="w-full mb-80">
          <h2 className="text-xl md:text-2xl font-medium mb-4">Mais imagens de {pet.name}</h2>
          <div className="flex gap-8 w-full flex-wrap">
            {pet.moreImages &&
              pet.moreImages.map((image, index) => (
                <div className="flex-1 min-h-[400px] max-h-[400px] max-w-[400px] min-w-[400px] overflow-hidden flex items-center justify-center rounded-xl shadow-md" key={index}>
                  <img
                    src={image.url}
                    alt={`Imagens adicionais do pet ${pet.name}`}
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default PetProfile;
