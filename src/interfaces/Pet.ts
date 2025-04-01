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
  name?: string;
  species: Species;
  breed: string;
  age: number;
  size: "Pequeno" | "Médio" | "Grande";
  gender: "Macho" | "Fêmea" | "Desconhecido";
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

enum Energy {
  low = "Baixa",
  medium = "Média",
  high = "Alta",
}
