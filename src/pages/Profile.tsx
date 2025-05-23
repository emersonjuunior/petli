import { useParams, Navigate, Link } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import { useAvailablePets } from "../hooks/useAvailablePets";
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
  const { petLoading, profileAvailablePets } = useAvailablePets(usernameId!);

  if (loading || petLoading) {
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
        <div className="w-full max-w-7xl mx-auto md:px-12 lg:px-2 flex gap-10 flex-col lg:flex-row">
          <section className="flex flex-col gap-5 px-4 lg:px-2 basis-[330px] md:w-full md:max-w-[520px] md:mx-auto">
            <img
              src={userProfile.userImage!}
              alt={`Foto de Perfil do Usuário ${userProfile.username}`}
              className="size-70 md:size-75 rounded-full object-cover self-center"
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
                <span className="text-xl font-medium mr-1 min-w-[14px] inline-block">
                  {profileAvailablePets.length}
                </span>{" "}
                disponíveis para adoção
              </p>
              <p>
                <span className="text-xl font-medium mr-1 min-w-[14px] inline-block">
                  0
                </span>{" "}
                adotados{" "}
              </p>
              <p>
                <span className="text-xl font-medium mr-1 min-w-[14px] inline-block">
                  0
                </span>{" "}
                doados
              </p>
            </div>
          </section>
          <section className="flex-1 flex flex-col gap-4 border-1 border-[#424242] rounded-lg md:rounded-2xl py-8 md:p-8">
            <div className="flex flex-col gap-4 px-3 md:px-0">
              <h2 className="text-3xl font-medium after:content-[''] after:block after:h-[2px] after:w-13 after:bg-primaryRed">
                Sobre
              </h2>
              <p>{about != "" ? about : "Nada informado."}</p>
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col gap-3 w-full">
              <h2
                className={`px-3 md:px-0 text-2xl font-medium after:content-[''] after:block after:h-[2px] after:w-13 after:bg-primaryRed ${
                  profileAvailablePets.length > 0 ? "mb-4" : ""
                }`}
              >
                Disponíveis para adoção
              </h2>
              {profileAvailablePets.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={50}
                  slidesPerView={1}
                >
                  {profileAvailablePets.map((pet) => (
                    <SwiperSlide key={pet.id}>
                      <PetCard
                        name={pet.name}
                        species={pet.species}
                        image={pet.image}
                        location={`${pet.city}, ${pet.state}`}
                        age={pet.age}
                        gender={pet.gender}
                        size={pet.size}
                        id={pet.id}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex items-center justify-center relative">
                  <Lottie
                    animationData={noAvailablePets}
                    className="w-[420px] min-w-[420px]"
                  />
                  <p className="font-[400] text-3xl text-center absolute bottom-8">
                    Nada por enquanto.
                  </p>
                </div>
              )}
            </div>
            <hr className="text-[#424242]" />
            <div className="flex flex-col md:gap-3 mb-2 md:mb-4 w-full swiper-min">
              <h2 className="px-3 md:px-0 text-2xl font-medium after:content-[''] after:block after:h-[2px] after:w-13 after:bg-primaryRed">
                Adotados
              </h2>
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
            <div className="flex flex-col md:gap-3 mb-2 md:mb-4 w-full swiper-min">
              <h2 className="px:0 md:px-0 text-2xl font-medium mb-3 after:content-[''] after:block after:h-[2px] after:w-13 after:bg-primaryRed">
                Doados
              </h2>
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
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;
