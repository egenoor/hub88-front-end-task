import { Table } from 'antd'
import { Country } from '../graphql/query.interfaces'

export default function CountryTable(props: { dataSource: Country[] }) {
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

  return <Table dataSource={props.dataSource} columns={columns} />
}
