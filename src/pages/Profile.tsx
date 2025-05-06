import { useParams, Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { usernameId } = useParams();
  const { username } = useUserContext();

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

  console.log(username);

  console.log(userProfile);

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
        <div className="w-full max-w-7xl mx-auto px-2 md:px-4 flex gap-10">
          <section className="flex flex-col gap-5 px-2 basis-[330px]">
            <img
              src={userProfile.userImage!}
              alt={`Foto de Perfil do Usuário ${userProfile.username}`}
              className="size-75 rounded-full"
            />
            <div>
              <h1 className="font-medium text-2xl mb-1">
                {userProfile.username}
              </h1>
              <p className="text-lg">{userProfile.displayName}</p>
            </div>
            {username === userProfile.username && (
              <div className="w-full flex items-center justify-center">
                <button className="bg-primaryRed w-full py-2 rounded-lg text-lg font-medium hover:bg-rose-700 duration-300 cursor-pointer">
                  Editar Perfil
                </button>
              </div>
            )}
            <div>
              <p>
                <i className="fa-solid fa-users text-[#bebaba] mr-1" /> Membro
                desde{""}
                <span className="font-medium"> dezembro de 2025</span>
              </p>
            </div>
            <div>
              <p className="text-lg">
                <i className="fa-solid fa-map-pin text-[#bebaba] mr-1" />{" "}
                Ipanema, MG
              </p>
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col gap-2">
              <p>
                <span className="text-xl font-medium mr-1">0</span> disponíveis
                pra adoção
              </p>
              <p>
                <span className="text-xl font-medium mr-1">0</span> adotados{" "}
              </p>
              <p>
                <span className="text-xl font-medium mr-1">0</span> doados
              </p>
            </div>
          </section>
          <section className="flex-1 flex flex-col gap-4 border-1 border-[#424242] rounded-2xl p-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-medium">Sobre</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus vitae officia aliquid reprehenderit, similique vero
                rerum soluta dicta quae minima, ad vel aperiam quaerat voluptate
                perferendis nemo laudantium! Beatae pariatur vero nostrum
                voluptas numquam! Ex cum nobis assumenda totam nesciunt!
              </p>
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col gap-3 mb-4">
              <h2 className="text-2xl font-medium">Disponíveis pra adoção</h2>
           
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;
