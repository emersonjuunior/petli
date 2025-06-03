import { IPetCard } from "../interfaces/Pet";
import { Link } from "react-router-dom";
import { useState } from "react";

const PetCard = ({
  name,
  species,
  image,
  location,
  age,
  gender,
  size,
  preview,
  id,
}: IPetCard) => {
  const [imgLoad, setImgLoad] = useState(true);
  return (
    <article className="bg-[#292929] rounded-md shadow-lg w-[310px] md:w-[360px] h-[450px] md:h-[500px] border-1 border-bgGray border-b-primaryRed mx-auto relative flex flex-col group overflow-hidden">
      {imgLoad && image != "" && (
        <div className="w-full min-h-[188px] max-h-[188px] md:min-h-[220px] md:max-h-[220px] rounded-lg shadow-md bg-bgGray animate-pulse"></div>
      )}
      <div className="rounded-lg flex justify-center">
        {image === "" ? (
          <div className="min-h-[220px] flex items-center bg-[#272727] w-full justify-center">
            <p className="text-lg max-w-6/10 text-center font-medium">
              Envie uma imagem do seu pet 🐾
            </p>
          </div>
        ) : (
          <img
            src={image}
            onLoad={() => setImgLoad(false)}
            alt={`Foto do Pet ${name}`}
            className={`${
              imgLoad ? "hidden" : ""
            } w-full min-h-[188px] max-h-[188px] md:min-h-[220px] md:max-h-[220px] rounded-lg shadow-md object-cover`}
          />
        )}
      </div>
      <h3 className="pet-card-title text-2xl font-bold bg-primaryRed px-5 py-2 w-fit min-w-1/2 group-hover:min-w-[62%] duration-300 text-center mx-auto mb-3 truncate max-w-9/10">
        <i
          className={`fa-solid ${
            species === "Cachorro"
              ? "fa-dog"
              : species === "Gato"
              ? "fa-cat"
              : ""
          } text-xl`}
        ></i>{" "}
        {name}
      </h3>
      <ul className="flex flex-col gap-2 px-6 mb-4 md:mb-5">
        <li className="flex items-center min-h-[24px]">
          <i className="fa-solid fa-map-pin text-lg text-[#bebaba] min-w-[25px] group-hover:text-[#e4e3e3]"></i>{" "}
          <span className="truncate">{location}</span>
        </li>
        <li className="flex items-center min-h-[24px]">
          <i className="fa-solid fa-cake-candles text-lg text-[#bebaba] min-w-[25px] group-hover:text-[#e4e3e3]"></i>{" "}
          {age}
        </li>
        <li className="flex items-center min-h-[24px]">
          <i
            className={`fa-solid ${
              gender === "Macho"
                ? "fa-mars"
                : gender === "Fêmea"
                ? "fa-venus"
                : "fa-question"
            } text-lg text-[#bebaba] min-w-[25px] group-hover:text-[#e4e3e3]`}
          ></i>
          {gender}
        </li>
        <li className="flex items-center min-h-[24px]">
          <i className="fa-solid fa-ruler text-lg text-[#bebaba] min-w-[25px] group-hover:text-[#e4e3e3]"></i>
          {size}
        </li>
      </ul>
      <div className="bg-bgGray w-full max-w-[90%] h-[1px] mx-auto mb-3 md:mb-4 group-hover:bg-[#404040]"></div>
      <div className="flex items-center justify-center">
        <Link to={`/pet/${id}`}>
          <button
            disabled={preview}
            className={`${
              preview
                ? "border-[#414141] cursor-not-allowed"
                : "border-accentBlue cursor-pointer"
            } pet-btn inline-block px-7 py-[6px] md:py-2 font-bold text-white border-3 relative overflow-hidden z-10 bg-transparent`}
          >
            <span className="relative z-10 uppercase tracking-wider">
              Ver mais
            </span>
            <span
              className={`${
                preview ? "" : "absolute"
              } button-span inset-0 bg-accentBlue transform -translate-x-full transition-all duration-300 z-0`}
            ></span>
          </button>
        </Link>
      </div>
    </article>
  );
};

export default PetCard;
