import React from "react"
import { AsyncStorage, StatusBar, StyleSheet, ActivityIndicator, FlatList } from "react-native"
import { withTheme, ScreenContainer, Button } from "@draftbit/ui"
import { graphql } from "react-apollo"
import { compose } from "recompose"
import gql from "graphql-tag"
import { draftbit as screenTheme } from "../config/Themes"
import { ProjectCard } from "../components"

class MainScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("dark-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  renderItem = ({ item }) => {
    const { theme } = this.state
    const { ownerId, title, userByOwnerId: { firstName, lastName}} = item
    const { GetCurrentUser: {
      getCurrentUser: { userId }
    }
    } = this.props
    // TODO: Fix Database so that ownerId's come back in type int instead of string
    const isOwner = (ownerId == userId)
    const ownerName = firstName + " " + lastName
    return <ProjectCard theme={theme} isOwner={isOwner} title={title} ownerName={ownerName}/>
  }

  render() {
    const { theme } = this.state
    const {
      GetAllProjects: { loading: loading1 },
      GetCurrentUser: { loading: loading2 }
    } = this.props

    if (loading1 || loading2) return <ActivityIndicator />

    const {
      GetAllProjects: {
        allProjects: {
          nodes: projects
        }
      },
      GetCurrentUser: {
        getCurrentUser: { userId }
      }
    } = this.props

    return (
      <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_nug}>
        <FlatList
          data={projects}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.projectId.toString()}
        />
        <Button
          style={styles.Button_n3l}
          icon="FontAwesome/angle-left"
          type="outline"
          onPress={async () => {
            await AsyncStorage.removeItem("token")
            this.props.navigation.navigate("AuthNavigator")
          }}>
          Logout
        </Button>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Root_nug: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    padding: 4
  },
  Button_n3l: {
    marginTop: 32
  }
})

const GET_ALL_PROJECTS = gql`
  {
    allProjects {
      nodes {
        projectId
        ownerId
        title
        userByOwnerId {
          firstName
          lastName
        }
      }
    }
  }
`

const GET_CURRENT_USER = gql`
  {
    getCurrentUser {
      userId
    }
  }
`

export default compose(
  graphql(GET_ALL_PROJECTS, { name: "GetAllProjects" }),
  graphql(GET_CURRENT_USER, { name: "GetCurrentUser" }),
  withTheme
)(MainScreen)
