import { Timestamp } from "firebase/firestore";

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
  image: string;

  state: string;
  city: string;
  contact: string;
  allowContact: boolean;
  adoptionQuestions?: string;

  vaccinated?: string;
  neutered?: boolean;
  dewormed?: boolean;
  specialCare?: string;

  goodWithOtherAnimals?: boolean;
  goodWithChildren?: boolean;
  description?: string;
  moreImages?: string[];

  owner: string;

  pendingRequests: number;
  createdAt: Timestamp;
}

export interface IDonatedPet {
  date: Timestamp;
  name: string;
  image: string;
}
