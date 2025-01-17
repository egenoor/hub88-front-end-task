import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import { GET_COUNTRIES } from '../../graphql/queries'
import CountriesView from '../../views/countries.view'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mocks: MockedResponse<any, any>[] = [
  {
    request: {
      query: GET_COUNTRIES,
    },
    result: {
      data: {
        countries: [
          {
            name: 'Andorra',
            code: 'AD',
          },
          {
            name: 'United Arab Emirates',
            code: 'AE',
          },
        ],
      },
    },
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const failureMock: MockedResponse<any, any>[] = [
  {
    request: {
      query: GET_COUNTRIES,
    },
    result: {
      errors: [new GraphQLError('Error!')],
    },
  },
]

const setup = (apiMocks = mocks) => {
  render(
    <MockedProvider mocks={apiMocks} addTypename={false}>
      <CountriesView />
    </MockedProvider>
  )
}

describe('successful countries view flow', () => {
  it('renders without error', async () => {
    setup()
    expect(await screen.findByText('Countries')).toBeInTheDocument()
  })

  it('should render countries table', async () => {
    setup()
    expect(await screen.findByText('Andorra')).toBeInTheDocument()
    expect(await screen.findByText('United Arab Emirates')).toBeInTheDocument()
  })

  it('should display empty table when filtering with unknown country code', async () => {
    setup()
    const filterInput = await screen.findByPlaceholderText(
      'Filter by country code'
    )
    fireEvent.change(filterInput, { target: { value: 'HM' } })
    expect((filterInput as HTMLInputElement).value).toBe('HM')
    expect(screen.queryByText('AD')).not.toBeInTheDocument()
    expect(screen.queryByText('AE')).not.toBeInTheDocument()
  })

  it('should render empty table with no data', async () => {
    setup([])
    expect(screen.queryByText('Andorra')).not.toBeInTheDocument()
    expect(screen.queryByText('United Arab Emirates')).not.toBeInTheDocument()
    expect((await screen.findAllByText('No data')).length).toBe(2)
  })

  it('should filter countries table with country code filter input', async () => {
    setup()
    const expectedResults = [
      {
        countryName: 'Andorra',
        countryCode: 'AD',
      },
      {
        countryName: 'United Arab Emirates',
        countryCode: 'AE',
      },
    ]

    for (const result of expectedResults) {
      expect(await screen.findByText(result.countryName)).toBeDefined()
      expect(await screen.findByText(result.countryCode)).toBeDefined()
    }

    const filterInput = await screen.findByPlaceholderText(
      'Filter by country code'
    )
    fireEvent.change(filterInput, { target: { value: 'AE' } })
    expect((filterInput as HTMLInputElement).value).toBe('AE')

    expect(
      await screen.findByText(expectedResults[1].countryCode)
    ).toBeDefined()

    fireEvent.change(filterInput, { target: { value: '' } })
    expect((filterInput as HTMLInputElement).value).toBe('')

    for (const result of expectedResults) {
      expect(await screen.findByText(result.countryName)).toBeDefined()
      expect(await screen.findByText(result.countryCode)).toBeDefined()
    }

    fireEvent.change(filterInput, { target: { value: 'ad' } })
    expect((filterInput as HTMLInputElement).value).toBe('ad')
    expect(
      await screen.findByText(expectedResults[0].countryCode)
    ).toBeDefined()
  })
})

describe('failed countries view flow', () => {
  it('should render empty table and should render message if api throws error', async () => {
    setup(failureMock)
    expect((await screen.findAllByText('No data')).length).toBe(2)
    expect(await screen.findByText('Error!')).toBeDefined()
  })
})
