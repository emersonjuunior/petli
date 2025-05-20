export interface IRequestSent {
  petId: string;
  date: Date;
  text: string;
  location: string;
  owner: string;
  status: string;
}

export interface IRequestReceived {
  petId: string;
  date: Date;
  text: string;
  location: string;
  interested: string;
}
