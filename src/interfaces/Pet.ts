export interface IPetCard {
  name: string;
  species: string;
  image: string;
  location: string;
  age: string;
  gender: string;
  size: string;
  preview?: boolean;
  id?: string;
}

export interface IPet {
  id: string;
  species: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  image: IPetImage;

  state: string;
  city: string;
  contact: string;
  allowContact: boolean;

  vaccinated?: string;
  neutered?: boolean;
  dewormed?: boolean;
  specialCare?: string;

  goodWithOtherAnimals?: boolean;
  goodWithChildren?: boolean;
  description?: string;
  moreImages?: IPetImage[];

  owner: string;
  date: string;
}

export interface IPetImage {
  url: string;
  id: string;
}
