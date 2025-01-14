import { useQuery } from '@apollo/client'
import { Col, Flex, Input, Row, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import CountryTable from '../components/country-table.component'
import { GET_COUNTRIES } from '../queries/queries'
import { Country, GetCountriesQuery } from '../queries/query.interfaces'

export default function CountriesView() {
  const { loading, data, error } = useQuery<GetCountriesQuery>(GET_COUNTRIES)
  const [filteredData, setFilteredData] = useState<Country[]>([])
  const filterByCountryCode: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFilteredData(
      data?.countries.filter((country) => {
        return country.code.includes(e.target.value ?? '')
      }) ?? []
    )
  }

  useEffect(() => {
    setFilteredData(data?.countries ?? [])
  }, [data])

  return (
    <Flex vertical className="p-10">
      <Row className="my-5">
        <h1 className="text-2xl font-medium">Countries</h1>
      </Row>
      <Row className="my-2">
        <p className="mx-4 py-1 font-bold">Filters: </p>
        <Col span={4}>
          <Input
            className="filter-input"
            placeholder="Filter by country code"
            onChange={filterByCountryCode}
          />
        </Col>
      </Row>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div>{error?.message}</div>
          <CountryTable dataSource={filteredData} />
        </>
      )}
    </Flex>
  )
}
