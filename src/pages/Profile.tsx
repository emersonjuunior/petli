import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetDocuments } from "../hooks/useGetDocuments";

const Profile = () => {
  const { username } = useParams();
  const { user, loading } = useGetDocuments("usernames", username!);
  console.log(user);

  if(loading){
    return <p>Carregando...</p>
  }

  if (user === null) {
    return <Navigate to="*" />;
  }

  return (
    <div>
      <h1>Perfil de {username}.</h1>
    </div>
  );
};

export default Profile;
