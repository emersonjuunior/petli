interface Props {
  species: string;
  setSpecies: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  breed: string;
  setBreed: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const FirstStep = ({
  species,
  setSpecies,
  name,
  setName,
  breed,
  setBreed,
  gender,
  setGender,
  age,
  setAge,
  size,
  setSize,
  image,
  setImage,
}: Props) => {
  return (
    <div className="bg-bgGray px-4 py-4">
      <h2 className="text-xl md:text-2xl font-medium mb-4">
        Informações principais
      </h2>
      <div className="w-full h-[.5px] bg-[#555252]"></div>
      <form>
        <label>
          <input
            type="text"
            placeholder="Nome do pet"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            minLength={2}
            maxLength={14}
          />
        </label>
        <label>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default FirstStep;
