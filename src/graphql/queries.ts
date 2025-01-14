import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query GET_COUNTRIES {
    countries {
      name
      code
    }
  }
`