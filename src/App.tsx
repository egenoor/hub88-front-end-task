import { useQuery } from '@apollo/client'
import './App.css'
import { GET_COUNTRIES } from './queries'
import { GetCountriesQuery } from './query.interfaces'

export default function App() {
  const { loading, data } = useQuery<GetCountriesQuery>(GET_COUNTRIES)

  return (
    <div>
      <h3>Countries</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Capital</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {data?.countries.map((country) => (
              <tr>
                <td>{country.capital}</td>
                <td>{country.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
