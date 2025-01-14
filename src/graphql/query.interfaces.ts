export interface GetCountriesQuery {
  countries: Country[]
}

export interface Country {
  name: string
  code: string
}