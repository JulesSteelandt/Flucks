export interface Payload {
  username: string;
  email: string;
}

export interface Diffusion {
  id: string;
  direct: boolean;
  titre: string;
  vue: number;
  description?: string | null;
  public: boolean;
  createur: string;
  geolocalisationId?: number | null;
  urgence: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
      idDiffusion?: string;
    }
  }
}
