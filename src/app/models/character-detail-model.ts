export interface CharacterDetails {
  character: {
    id: number;
    name: string;
    image: string;
    species: string;
    gender: string;
    status: string;
    origin: {
      name: string;
      residents: { id: number; name: string; image: string }[];
    };
    location: {
      name: string;
      residents: { id: number; name: string; image: string }[];
    };
    episode: { id: number; name: string; air_date: string }[];
  };
}
