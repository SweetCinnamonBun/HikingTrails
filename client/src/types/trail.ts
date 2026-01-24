export type Difficulty = {
  id: string;
  name: string;
};

export type Region = {
  id: string;
  code: string;
  name: string;
};

export type Trail = {
  id: string;
  name: string;
  description: string;
  createdAt: string; 
  difficulty: Difficulty;
  difficultyId: string;
  durationInMinutes: number;
  imageUrl: string;
  lengthInKm: number;
  region: Region;
  regionId: string;
};

