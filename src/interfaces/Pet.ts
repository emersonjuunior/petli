export interface IPetCard {
  name?: string;
  species: string;
  image: string;
  location: string;
  age: string;
  gender: "Macho" | "Fêmea" | "Desconhecido";
  size: "Pequeno" | "Médio" | "Grande";
}

export interface IPet {
  id: string;
  species: Species;
  name?: string;
  breed: string;
  gender: "Macho" | "Fêmea" | "Desconhecido";
  age: number;
  size: "Pequeno" | "Médio" | "Grande";
  image: string;

  state: string;
  city: string;
  contact: string;

  vaccinated: boolean | string;
  neutered: boolean;
  dewormed: boolean;
  specialCare?: string;

  temperament: string;
  goodWithOtherAnimals: boolean;
  goodWithChildren: boolean;
  energyLevel: Energy;
  history?: string;
  adoptionRequirements?: string[];
  moreImages?: string[];
}

enum Species {
  dog = "Cachorro",
  cat = "Gato",
  rabbit = "Coelho",
  bird = "Pássaro",
  hamster = "Hamster",
  other = "Outro",
}

enum Energy {
  low = "Baixa",
  medium = "Média",
  high = "Alta",
}
