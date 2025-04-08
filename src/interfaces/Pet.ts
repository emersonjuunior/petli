export interface IPetCard {
  name: string;
  species: string;
  image: string;
  location: string;
  age: string;
  gender: string;
  size: string;
}

export interface IPet {
  id: string;
  species: string;
  name?: string;
  breed: string;
  gender: "Macho" | "Fêmea" | "Desconhecido";
  age: number;
  size: "Pequeno" | "Médio" | "Grande";
  image: string;

  state: string;
  city: string;
  contactMethod: "Email" | "WhatsApp"
  contact: string;

  vaccinated: boolean | string;
  neutered: boolean;
  dewormed: boolean;
  specialCare: string;

  temperament?: string;
  goodWithOtherAnimals?: boolean;
  goodWithChildren?: boolean;
  energyLevel?: "Baixo" | "Médio" | "Alto";
  history?: string;
  adoptionRequirements?: string[];
  moreImages?: string[];
}
