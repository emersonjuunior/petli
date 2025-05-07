import { useState } from "react";
import ViewImage from "./ViewImage";

interface Props {
  image: string;
  name: string;
  date: string;
}

const PetSummary = ({ image, name, date }: Props) => {
  const [viewImage, setViewImage] = useState(false);

  return (
    <div className="bg-[#303030] w-[310px] p-3 shadow-lg rounded-2xl h-[325px] min-h-fit">
      <div className="w-full ">
        <img
          src={image}
          alt={`Foto do animalzinho ${name}`}
          className="mb-3 rounded-lg object-cover h-[230px] max-h-[230px] w-full cursor-pointer hover:brightness-110 duration-200"
          onClick={() => setViewImage(true)}
        />
      </div>
      <h3 className="font-medium text-2xl">{name}</h3>
      <p className="font-light">
        Encontrou um lar em: <span className="font-semibold text-sm">{date}</span>
      </p>
      {viewImage && (
        <ViewImage
          image={image}
          name={name}
          setViewImage={setViewImage}
        />
      )}
    </div>
  );
};

export default PetSummary;
