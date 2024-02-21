import { FilmAPI } from './film';
import { PeopleAPI, Pilot } from './people';

export interface StarshipAPI {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  crew: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[] | FilmAPI[];
  pilots: string[] | PeopleAPI[];
  starship_class: string;
  url: string;
  created: Date;
  edited: Date;
}

export enum StarshipClassEnum {
  starfighter = 'Starfighter',
  battlestation = 'Deep Space Mobile Battlestation'
}

export interface Starship {
  name: string,
  pilot: Pilot,
  model: string,
  starship_class: StarshipClassEnum,
  cost_in_credits: number,
  length: string,
  max_atmosphering_speed: string,
}
