import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query {
    countries {
      name
      code
    }
  }
`