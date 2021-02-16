import { ObjectId } from 'mongodb'

export interface CityType {
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

export interface CategoryType {
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

export interface mapState {
  coordinates: [number, number],
  zoom: number
}

export interface mapValuesObject {
  height: number,
  width: number,
  minZoom: number,
  translateExtent: number[][],
  boxMargin: number | boolean,
  boxBorderRadius: string,
  boxHeight: string
}

export interface userObject {
  name: string,
  email: string,
  image: string,
  uid: string
}