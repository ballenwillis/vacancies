import React from "react"
import { Image } from 'react-native'
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import PostScreen from "./screens/PostScreen"
import HomeScreen from "./screens/HomeScreen"
// import ProjectScreen from "./screens/ProjectScreen"


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
          navigationOptions: ({ navigation }) => ({ tabBarLabel: "Home",
            tabBarIcon: ({tintColor}) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{width: 25, height: 25}}
            />)
          })

        },
        PostScreen:{
          screen: PostScreen,
          navigationOptions: ({ navigation }) => ({ tabBarLabel: "Post",
            tabBarIcon: ({tintColor}) => (<Image
              source={require('./assets/images/settings.png')}
              style={{width: 25, height: 25}}
            />)
          })
        },


      }, {
        tabBarOptions:{
          activeTintColor: 'black',
          inactiveTintColor: 'grey'
        }
      }),

    // @TODO Need to figure out way to get from project details screen back to tabbed view
    // Project_details: createStackNavigator(
    //   {
    //     ProjectScreen: {
    //       screen: ProjectScreen,
    //       navigationOptions: ({ navigation }) => ({ title: "View Project" })
    //     },
    //
    //   },
    //   {
    //     navigationOptions: {
    //       header: null
    //     }
    //   }
    // )



  },
  {
    initialRouteName: "AuthNavigator"
  }
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
