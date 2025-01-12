import { useQuery } from '@apollo/client'
import { Input, Table } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { GET_COUNTRIES } from '../queries'
import { GetCountriesQuery } from '../query.interfaces'
import { Country } from './common/types/data.interface'
import './country-table.css'

export const CountryTable: FunctionComponent = () => {
  const { loading, data } = useQuery<GetCountriesQuery>(GET_COUNTRIES)
  const [filteredData, setFilteredData] = useState<Country[]>([])
  const columns = [
    {
      title: 'Country name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Country code',
      dataIndex: 'code',
      key: 'code',
    },
  ]

  useEffect(() => {
    setFilteredData(data?.countries ?? [])
  }, [data])

  const filterByCountryCode: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFilteredData(
      data?.countries.filter((country) => {
        return country.code.includes(e.target.value ?? '')
      }) ?? []
    )
  }

  return (
    <div className="p-10">
      <h3 className="text-2xl font-medium my-4">Countries</h3>
      <Input placeholder="Country code" onChange={filterByCountryCode} />
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Table dataSource={filteredData} columns={columns} />
      )}
    </div>
  )
}
