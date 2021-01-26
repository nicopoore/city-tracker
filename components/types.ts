export interface City {
  name: string,
  country: string,
  coordinates: [number, number],
  place_id
}

export interface CategoryRecord {
  _id: string,
  name: string,
  userId: string,
  color: string,
  cities: number[],
  __v: number
}

export interface Category {
  name: string,
  userId: string,
  color: string,
  cities: number[],
}

export interface NestedCities {
  [name: string]: string[]
}