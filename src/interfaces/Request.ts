import { Timestamp } from "firebase/firestore";

export interface IRequest {
  petId: string;
  date: Timestamp;
  text: string;
  location: string;
  interested: string;
  owner: string;
  status: string;
}
