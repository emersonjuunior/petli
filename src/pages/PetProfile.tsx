import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";
import PetCard from "../components/PetCard";

const PetProfile = () => {
  const { petId } = useParams();
  const { pet, loading } = useGetProfile("pets", petId!);

  if (loading) {
    return <Loading />;
  }

  if (pet === null) {
    return <Navigate to="*" />;
  }

  console.log(pet.moreImages);
  return (
    <div>
      <h2>Perfil do {pet.name}</h2>
      <h3>Ele tem {pet.age}</h3>
      <PetCard
        name={pet.name}
        age={pet.age}
        species={pet.species}
        size={pet.size}
        image={pet.image.url}
        location={`${pet.city}, ${pet.state}`}
        gender={pet.gender}
      />

      {pet.moreImages?.map((image, index) => (
        <img src={image.url} key={index} alt="Teste" />
      ))}
    </div>
  );
};

export default PetProfile;
