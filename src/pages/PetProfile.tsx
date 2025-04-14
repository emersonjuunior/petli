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
              <h1 className="font-medium text-3xl md:text-6xl mb-7">
                {pet.name}
              </h1>
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
              <div className="absolute bottom-0 text-lg">
                <div className="flex gap-3 items-center">
                  {" "}
                  <p>Responsável: </p>
                  <Link to={`/${pet.owner}`}>
                    <p className="flex items-center gap-1">
                      <img src="/no-user.png" className="w-10" />
                      <span>{pet.owner}</span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="text-[#404040] mt-4" />
      </div>
    </main>
  );
};

export default PetProfile;
