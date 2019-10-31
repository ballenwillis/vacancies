import React from "react"
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import MainScreen from "./screens/MainScreen"

import { Icon, Touchable } from "@draftbit/ui"

function shouldShowBackButton(stackRouteNavigation) {
  let parent = stackRouteNavigation.dangerouslyGetParent()
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0
}

const AppNavigator = createStackNavigator(
  {
    AuthNavigator: createStackNavigator(
      {
        LoginScreen: {
          screen: LoginScreen
        },
        SignUpScreen: {
          screen: SignUpScreen
        }
      },
      {
        headerMode: "none",
        initialRouteName: "LoginScreen"
      }
    ),
    Main_App: createStackNavigator(
      {
        MainScreen: {
          screen: MainScreen,
          navigationOptions: ({ navigation }) => ({ title: "Projects" })
        }
      },
      {
        headerMode: "none",
        defaultNavigationOptions: ({ navigation, tintColor }) => ({
          headerTitleStyle: { fontFamily: "MerriweatherLight" }
        })
      }
    )
  },
  {
    initialRouteName: "Main_App"
  }
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
