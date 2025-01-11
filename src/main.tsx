import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
})
const root = document.getElementById('root')!

createRoot(root).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
