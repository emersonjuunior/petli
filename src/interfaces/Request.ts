import { Timestamp } from "firebase/firestore";

export interface IRequest {
  requestId: string;
  petId: string;
  date: Timestamp;
  text: string;
  location: string;
  interested: string;
  owner: string;
  status: "Em análise" | "Aprovada" | "Recusada";
  petImage: string;
  adoptionAnswers: string;
  petName: string;
  petProfile?: string;
  petContact?: string;
}
