import React from "react"
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import ProjectScreen from "./screens/ProjectScreen"
import PostScreen from "./screens/PostScreen"
import HomeScreen from "./screens/HomeScreen"

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
        Main_App: createBottomTabNavigator(
            {
                HomeScreen: {
                    screen: HomeScreen,
                    navigationOptions: ({ navigation }) => ({ title: "Home" }),

                },
                PostScreen:{
                    screen: PostScreen,
                    navigationOptions: ({ navigation }) => ({ title: "Post" })
                },




        }),

        // @TODO Need to figure out way to get from project details screen back to tabbed view
        Project_details: createStackNavigator(
            {


                ProjectScreen: {
                    screen: ProjectScreen,
                    navigationOptions: ({ navigation }) => ({ title: "View Project" })
                },

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
