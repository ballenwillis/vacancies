import { AsyncStorage } from "react-native"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import fetch from "unfetch"

const cache = new InMemoryCache()

const link = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token")

  let newHeaders = { headers: { ...headers } }

  if (token) {
    newHeaders = {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  }

  return newHeaders
}).concat(new HttpLink({ uri: "http://localhost:3000/graphql", fetch }))

const client = new ApolloClient({
  cache,
  link
})

export default client
