import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";

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
    <div>
      <h2>Perfil do {pet.name}</h2>
      <h3>Ele tem {pet.age}</h3>
    </div>
  );
};

export default PetProfile;
