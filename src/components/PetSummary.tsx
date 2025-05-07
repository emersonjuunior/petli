interface Props {
  image: string;
  name: string;
  date: string;
}

const PetSummary = ({ image, name, date }: Props) => {
  return (
    <div className="bg-[#303030] w-[310px] p-3 shadow-lg rounded-2xl h-[325px] min-h-fit">
      <div className="w-full overflow-hidden rounded-lg max-h-[220px] mb-3">
        <img
          src={image}
          alt={`Foto do animalzinho ${name}`}
          className="rounded-lg object-cover h-[220px] max-h-[220px] w-full hover:scale-105 duration-200"
        />
      </div>
      <h3 className="font-medium text-2xl">{name}</h3>
      <p className="font-light">
        Encontrou um lar em:{" "}
        <span className="font-semibold text-sm">{date}</span>
      </p>
    </div>
  );
};

export default PetSummary;
