interface IPetCard {
  name?: string;
  location: string;
  age: number;
  gender: string;
  size: Size;
}

export interface IPet {
  id: string;
  name?: string;
  species: Species;
  breed: string;
  age: number;
  size: Size;
  gender: Gender;
  image: string;

  vaccinated: boolean | string;
  neutered: boolean;
  dewormed: boolean;
  specialCare?: string;

  temperament: string;
  goodWithOtherAnimals: boolean;
  goodWithChildren: boolean;
  energyLevel: Energy;

  state: string;
  city: string;
  contact: string;
  moreImages?: string[];

  history?: string;
  adoptionRequirements?: string[];
}

enum Species {
  dog = "Cachorro",
  cat = "Gato",
  rabbit = "Coelho",
  bird = "Pássaro",
  hamster = "Hamster",
  other = "Outro",
}

enum Size {
  small = "Pequeno",
  medium = "Médio",
  large = "Grande",
}

enum Gender {
  male = "Macho",
  female = "Fêmea",
  unknown = "Desconhecido",
}

enum Energy {
  low = "Baixa",
  medium = "Média",
  high = "Alta",
}
