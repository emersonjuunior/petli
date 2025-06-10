import { Timestamp } from "firebase/firestore";

export interface IRequest {
  requestId: string;
  petId: string;
  date: Timestamp;
  text: string;
  location: string;
  interested: string;
  owner: string;
  status: string;
  petImage: string;
  adoptionAnswers: string;
  petName: string;
}
