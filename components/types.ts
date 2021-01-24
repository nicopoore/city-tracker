export interface City {
  uniqueID: number,
  name: string,
  country: string,
  coordinates: [number, number]
}

export interface Category {
  name: string,
  _id: string,
  userId: string,
  color: string,
  cities: number[],
  __v: number
}

export interface NestedCities {
  [name: string]: string[]
}