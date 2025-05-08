import { useParams, Navigate, Link } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import noAvailablePets from "../assets/no-available-pets.json";
import PetCard from "../components/PetCard";
import PetSummary from "../components/PetSummary";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Profile = () => {
  const { usernameId } = useParams();
  const { username, about, city, state } = useUserContext();

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
                <Link to="/editar-perfil" className="w-full">
                  <button className="bg-primaryRed w-full py-2 rounded-lg text-lg font-medium hover:bg-rose-700 duration-300 cursor-pointer">
                    Editar Perfil
                  </button>
                </Link>
              </div>
            )}
            <div>
              <p>
                <i className="fa-solid fa-users text-[#bebaba] mr-1" /> Membro
                desde{""}
                <span className="font-medium"> {userProfile.memberSince}</span>
              </p>
            </div>
            {city != "" && state != "" && (
              <div>
                <p className="text-lg">
                  <i className="fa-solid fa-map-pin text-[#bebaba] mr-1" />{" "}
                  {city}, {state}
                </p>
              </div>
            )}
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
              <p>{about != "" ? about : "Nada informado."}</p>
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col gap-3 mb-4 w-full">
              <h2 className="text-2xl font-medium mb-3">
                Disponíveis pra adoção
              </h2>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={50}
                slidesPerView={1}
              >
                <SwiperSlide>
                  {" "}
                  <PetCard
                    name={"jason"}
                    species={"Gato"}
                    image={"/jason.jpg"}
                    location={"Ipanema, MG"}
                    age={"3 anos"}
                    gender={"Macho"}
                    size={"Pequeno"}
                    id={"emerson-jr-yVVr"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <PetCard
                    name={"jason"}
                    species={"Gato"}
                    image={"/jason.jpg"}
                    location={"Ipanema, MG"}
                    age={"3 anos"}
                    gender={"Macho"}
                    size={"Pequeno"}
                    id={"emerson-jr-yVVr"}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col gap-3 mb-4 w-full swiper-min">
              <h2 className="text-2xl font-medium mb-3">Adotados</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={50}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <div className="h-full flex justify-center items-center">
                    <PetSummary
                      name="Jason"
                      image="/jason.jpg"
                      date="07/05/2025"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-full flex justify-center items-center">
                    <PetSummary
                      name="Jason"
                      image="/jason.jpg"
                      date="07/05/2025"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col gap-3 mb-4 w-full swiper-min">
              <h2 className="text-2xl font-medium mb-3">Doados</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={50}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <div className="h-full flex justify-center items-center">
                    <PetSummary
                      name="Jason"
                      image="/jason.jpg"
                      date="07/05/2025"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-full flex justify-center items-center">
                    <PetSummary
                      name="Jason"
                      image="/jason.jpg"
                      date="07/05/2025"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
              <Lottie animationData={noAvailablePets} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;
