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
          <div className="flex-1 flex items-center px-12 md:px-20 lg:px-24 h-[500px] min-h-fit">
            <div className="flex flex-col w-full justify-center h-full relative">
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
        <hr className="text-[#404040] my-4" />
        <div className="w-full flex gap-5">
          <section className="w-1/2 bg-[#303030] min-h-[300px] rounded-xl px-8 py-6 flex flex-col gap-5">
            <h2 className="text-xl md:text-2xl font-medium mb-2">
              Cuidados e Saúde 🩺
            </h2>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                O bichinho já tomou alguma vacina?
              </h3>
              <p>{pet.vaccinated}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                Necessita de cuidados especiais?
              </h3>
              <p>{pet.specialCare}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">Castrado?</h3>
              <p>{pet.neutered ? "Sim" : "Não"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">Vermifugado?</h3>
              <p>{pet.dewormed ? "Sim" : "Não"}</p>
            </div>
          </section>
          <section className="w-1/2 bg-[#303030] min-h-[300px] rounded-xl px-8 py-6 flex flex-col gap-5">
            <h2 className="text-xl md:text-2xl font-medium mb-2">
              Personalidade 🐾
            </h2>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">Descrição:</h3>
              <p className="break-words"> </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                Se dá bem com outros animais?
              </h3>
              <p>{pet.goodWithOtherAnimals ? "Sim" : "Não"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">Se dá bem com crianças?</h3>
              <p>{pet.goodWithChildren ? "Sim" : "Não"}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PetProfile;
