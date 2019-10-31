import * as React from "react"
import { Provider } from "@draftbit/ui"
import { AppLoading } from "expo"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "./config/ApolloClient"

import cacheAssetsAsync from "./utilities/cacheAssetsAsync"
import AppNavigator from "./AppNavigator"

export default class App extends React.PureComponent {
  state = {
    isReady: false
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={cacheAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider>
        <ApolloProvider client={client}>
          <AppNavigator />
        </ApolloProvider>
      </Provider>
    )
  }
}
