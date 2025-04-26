import { Location } from "./location-model"
import { Origin } from "./origin-model"

export interface Character {
  id: number,
  name: string,
  image: string,
  gender: string,
  species: string,
  status: string,
  type: string,
  episode: string[],
  location: Location,
  origin: Origin,
  created: Date,
  url: string
}
