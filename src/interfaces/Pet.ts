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
  name: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  image: string;

  state: string;
  city: string;
  contactMethod: string;
  contact: string;
  approved: boolean;

  vaccinated?: string;
  neutered?: boolean;
  dewormed?: boolean;
  specialCare?: string;

  goodWithOtherAnimals?: boolean;
  goodWithChildren?: boolean;
  description?: string;
  moreImages?: string[];
}
