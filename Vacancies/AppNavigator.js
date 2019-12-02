import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import MainScreen from "./screens/MainScreen"
import ProjectScreen from "./screens/ProjectScreen"

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
        navigationOptions: {
          headerVisible: false,
          header: null
        },
        initialRouteName: "LoginScreen"
      }
    ),
    Main_App: createStackNavigator(
      {
        MainScreen: {
          screen: MainScreen,
          navigationOptions: ({ navigation }) => ({ title: "Projects" })
        },
        ProjectScreen: {
            screen: ProjectScreen,
            navigationOptions: ({ navigation }) => ({ title: "SingleProject" })
        }
      },
      {
        navigationOptions: {
          header: null
        }
      }
    )

  },
  {
    initialRouteName: "AuthNavigator"
  }
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
