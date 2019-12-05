import React from "react"
import { AsyncStorage, StatusBar, StyleSheet, ActivityIndicator, FlatList, Image} from "react-native"
import { withTheme, ScreenContainer, Button } from "@draftbit/ui"
import { graphql } from "react-apollo"
import { compose } from "recompose"
import gql from "graphql-tag"
import { draftbit as screenTheme } from "../config/Themes"
import { ProjectCard } from "../components"

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle("dark-content")

        this.state = {
            theme: Object.assign(props.theme, screenTheme),
            backgroundColor: false
        }
    }

    onEdit = projectId => {
        return async () => {
            const { UpdateProject, GetAllProjects } = this.props
            const randomNumber = Math.floor(Math.random() * 100)
            await UpdateProject({
                variables: {
                    input: {
                        projectId,
                        projectPatch: {
                            title: "New Title has number " + randomNumber + "!"
                        }
                    }
                }
            })
            GetAllProjects.refetch()
        }
    }

    onDelete = projectId => {
        return async () => {
            const { DeleteProject, GetAllProjects } = this.props
            await DeleteProject({
                variables: {
                    input: {
                        projectId
                    }
                }
            })
            GetAllProjects.refetch()
        }
    }

    onCreate = async () => {
        const { CreateProject, GetAllProjects, GetCurrentUser: {getCurrentUser: {userId}} } = this.props
        const randomNumber = Math.floor(Math.random() * 100)
        await CreateProject({
            variables: {
                input: {
                    project: {
                        ownerId: userId,
                        title: "New Title has number " + randomNumber + "!"
                    }
                }
            }
        })
        GetAllProjects.refetch()
    }

    filter = async () => {
        this.state.backgroundColor = !this.state.backgroundColor
    }

    renderItem = ({ item }) => {
        const { theme } = this.state
        var {
            projectId,
            ownerId,
            title,
            description,
            externalLink,
            createdAt,
            sector,
            userByOwnerId: { firstName, lastName }
        } = item
        let projectSector = sector

        var {
            GetCurrentUser: {
                getCurrentUser: { userId, sector}
            }
        } = this.props
        // TODO: Fix Database so that ownerId's come back in type int instead of string
        const isOwner = ownerId == userId
        const ownerName = firstName + " " + lastName
        return (

            <ProjectCard
                theme={theme}
                isOwner={isOwner}
                title={title}
                description = {description}
                externalLink = {externalLink}
                ownerName={ownerName}
                onDelete={this.onDelete(projectId)}
                onEdit={this.onEdit(projectId)}
                navigation={this.props.navigation}
                createdAt = {createdAt}
                backgroundColHit = {this.state.backgroundColor}
                userSector = {sector}
                projectSector = {projectSector}
                projectId
            />

        )
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
                allProjects: { nodes: projects }
            }
        } = this.props

        return (
            <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_nug}>
                <FlatList
                    data={projects}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.projectId.toString()}
                />

              <Button
              style={{marginBottom: 16}}
              type="outline"
              onPress={this.filter}>
              Find Me Relevant Vacancies!
              </Button>
                {/*<Button*/}
                    {/*style={{marginBottom: 16}}*/}
                    {/*type="outline"*/}
                    {/*onPress={this.onCreate}>*/}
                    {/*Create New Project*/}
                {/*</Button>*/}
                <Button
                    type="outline"
                    onPress={async () => {
                        await AsyncStorage.removeItem("token")
                        this.props.navigation.navigate("AuthNavigator")
                    }}>

                  <Image source = {require("../assets/images/left-arrow.jpg")}
                         style={{width: 20, height: 10}}>
                  </Image>
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
    }
})

const GET_ALL_PROJECTS = gql`
  {
    allProjects {
      nodes {
        projectId
        ownerId
        title
        description
        createdAt
        externalLink
        sector
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
      aboutMe
      profilePictureId
      workHistory
      workSkills
      sector
      mobile
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($input: DeleteProjectByProjectIdInput!) {
    deleteProjectByProjectId(input: $input) {
      deletedProjectId
    }
  }
`

const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectByProjectIdInput!) {
    updateProjectByProjectId(input: $input) {
      project {
        projectId
      }
    }
  }
`

const CREATE_PROJECT = gql` 
  mutation CreateProject($input:CreateProjectInput!){
    createProject(input:$input){
      project{
        projectId
      }
    }
  }
`

export default compose(
    graphql(GET_ALL_PROJECTS, { name: "GetAllProjects" }),
    graphql(GET_CURRENT_USER, { name: "GetCurrentUser" }),
    graphql(DELETE_PROJECT, { name: "DeleteProject" }),
    graphql(UPDATE_PROJECT, { name: "UpdateProject" }),
    graphql(CREATE_PROJECT, {name: "CreateProject"}),
    withTheme
)(HomeScreen)
