import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";


const Profile = () => {
  const { usernameId } = useParams();
  const { username } = useUserContext();

  console.log(username);
  const { user: userProfile, loading } = useGetProfile(
    "usernames",
    usernameId!
  );

  if (loading) {
    return <Loading />;
  }

  if (userProfile === null) {
    return <Navigate to="*" />;
  }

  return (
    <>
      <Helmet>
        <title>{userProfile.username} | Petli</title>
        <meta
          name="description"
          content={`Conheça ${userProfile.username}, uma pessoa incrível que ajuda os bichinhos a encontrarem um novo lar.`}
        />
      </Helmet>
      <main className="w-full">
        <div className="w-full max-w-7xl mx-auto px-2 md:px-4">
          <section className="flex flex-col gap-5">
            <img
              src={userProfile.userImage!}
              alt={`Foto de Perfil do Usuário ${userProfile.username}`}
              className="size-60 rounded-full"
            />
            <div>
              <h1 className="font-medium text-2xl mb-2">
                {userProfile.username}
              </h1>
              <p className="text-lg">{userProfile.displayName}</p>
            </div>
          </section>
          <section></section>
        </div>
      </main>
    </>
  );
};

export default Profile;
