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

const AppNavigator = createSwitchNavigator(
  {
    Navigator: createStackNavigator(
      {
        LoginScreen: {
          screen: LoginScreen,
          navigationOptions: ({ navigation }) => ({ title: "Login" })
        },
        SignUpScreen: {
          screen: SignUpScreen,
          navigationOptions: ({ navigation }) => ({ title: "Sign Up Screen" })
        }
      },
      {
        headerMode: "none",
        initialRouteName: "LoginScreen"
      }
    ),
    Navigator_1: createStackNavigator(
      {
        MainScreen: {
          screen: MainScreen,
          navigationOptions: ({ navigation }) => ({ title: "Main Screen" })
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
  {}
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
