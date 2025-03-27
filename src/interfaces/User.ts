export interface IUser {
  username: string;
  displayName: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IFirestoreUsername {
  displayName: string;
  username: string;
}
