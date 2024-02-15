export interface Payload {
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload; // Définissez le type User pour la propriété user
    }
  }
}
