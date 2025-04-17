import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";

const Profile = () => {
  const { username } = useParams();
  const { user, loading } = useGetProfile("usernames", username!);

  console.log(loading);

  if (loading) {
    return <Loading />;
  }

  if (user === null) {
    return <Navigate to="*" />;
  }

  return (
    <main>
      <h1>Perfil de {username}.</h1>
    </main>
  );
};

export default Profile;
