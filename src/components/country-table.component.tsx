import { Table } from 'antd'
import { Country } from '../queries/query.interfaces'

export interface CountryTableProps {
  dataSource: Country[]
}

export default function CountryTable({ dataSource }: CountryTableProps) {
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

  return <Table dataSource={dataSource} columns={columns} />
}
