import { ObjectId } from 'mongodb'

export interface City {
  name: string,
  country: string,
  coordinates: [number, number],
  place_id: string
}

export interface CityRecord {
  _id: ObjectId,
  name: string,
  country: string,
  coordinates: [number, number],
  place_id: string
}

export interface Category {
  _id: ObjectId,
  name: string,
  userId: ObjectId,
  color: string,
  cities: string[],
}

export interface CategoryRecord {
  _id: ObjectId,
  name: string,
  userId: ObjectId,
  color: string,
  cities: string[],
}

export interface fullCitiesObject {
  categories: CategoryRecord[],
  cities: CityRecord[]
}

export interface NestedCities {
  [name: string]: { name: string, place_id: string }[]
}