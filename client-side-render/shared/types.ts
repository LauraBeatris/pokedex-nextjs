export interface PokemonName {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

export interface PokemonBase {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

export interface Pokemon {
  id: number;
  name: PokemonName;
  type: string[];
  base: PokemonBase;
}
