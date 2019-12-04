import React from "react"
import {
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    AsyncStorage,
    TextInput
} from "react-native"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { withTheme, ScreenContainer, Container, Image, Button, Touchable } from "@draftbit/ui"
import Images from "../config/Images.js"
import {compose} from "recompose";

class PostScreen extends React.Component {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle("dark-content")
    }

    state = {
        companyName: "Default Company Name",
        companyDetails: "Default Company Details",
        vacancyPay: "Default Pay (if applicable)",
        /* Default image */
        imageUrl: "https://apps-draftbit-com.s3.amazonaws.com/apps/zYTsJNxi/assets/9e8d5125-43b4-4e87-ab69-a16a93d67a50"
    }

    // post = async() => {
    //
    // }

    onCreate = async () => {
        const { companyName, companyDetails, vacancyPay, imageUrl } = this.state
        const { CreateProject, GetAllProjects, GetCurrentUser: {getCurrentUser: {userId}} } = this.props
        alert(imageUrl)
        await CreateProject({
            variables: {
                input: {
                    project: {
                        ownerId: userId,
                        title: companyName,
                        description: companyDetails,
                        externalLink: imageUrl
                    }
                }
            }
        })

        GetAllProjects.refetch()
    }

    render() {
        const { companyName, companyDetails, vacancyPay } = this.state
        const { theme } = this.props
        return (
            <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_ni5}>
                <KeyboardAvoidingView
                    style={styles.KeyboardAvoidingView_noy}
                    enabled={true}
                    behavior="padding"
                    keyboardVerticalOffset={0}>
                    <Container style={styles.Container_nt4} elevation={0} useThemeGutterPadding={true}>
                        <Text>{'\n'} </Text>
                        <Text
                            style={styles.Text_heading}>
                            Post
                        </Text>

                        <Text
                            style={[
                                styles.Text_nie,
                                theme.typography.headline5,
                                {
                                    color: theme.colors.light
                                }
                            ]}>
                            Post an opportunity
                        </Text>
                    </Container>
                    <Container style={styles.Container_nkd} elevation={0} useThemeGutterPadding={true}>
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Company Name"
                            placeholder="Company Name"
                            leftIconMode="inset"
                            onChangeText={name => this.setState({ companyName: name })}

                        />
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Company Description"
                            placeholder="Company Description"
                            leftIconMode="inset"
                            onChangeText={details => this.setState({ companyDetails: details })}

                        />

                      <TextInput
                        style={styles.TextField_nds}
                        type="solid"
                        label="Image URL"
                        placeholder="Image URL"
                        leftIconMode="inset"
                        onChangeText={image_url => this.setState({ external_link: image_url })}

                      />

                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Pay (if applicable)"
                            placeholder="Pay (if applicable)"
                            leftIconMode="inset"
                            keyboardType = "decimal-pad"
                            onChangeText={pay => this.setState({ vacancyPay: pay })}
                        />


                        <Button
                            style={styles.Button_na1}
                            type="solid"
                            color={theme.colors.light}
                            onPress={async () => await this.onCreate()}>
                            POST
                        </Button>

                    </Container>
                    <Container style={styles.Container_nfd} elevation={0} useThemeGutterPadding={true}>
                        <Text
                            style={[
                                styles.Text_n7b,
                                theme.typography.caption,
                                {
                                    color: theme.colors.light
                                }
                            ]}>
                            By tapping "Post", you agree to our Terms of Service, Privacy Policy and Cookie
                            Policy.
                        </Text>
                    </Container>
                </KeyboardAvoidingView>
            </ScreenContainer>
        )
    }
}

const styles = StyleSheet.create({
    Button_na1: {
        height: 48,
        marginVertical: 24
    },
    Container_nfd: {
        justifyContent: "flex-end"
    },
    Container_nt4: {
        alignItems: "center"
    },
    Image_nrg: {
        width: 100,
        height: 100
    },
    KeyboardAvoidingView_noy: {
        justifyContent: "space-around",
        flexGrow: 1
    },
    TextField_n1l: {
        height: 82
    },
    TextField_nds: {
        height: 82,
        marginBottom: 8
    },
    Text_n7b: {
        textAlign: "center",
        marginTop: 24
    },
    Text_na5: {
        textAlign: "center",
        width: "100%",
        marginBottom: 16
    },
    Text_ndm: {
        textAlign: "center"
    },
    Text_nie: {
        textAlign: "center",
        width: "100%"
    },
    Text_heading:{
        textAlign: "center",
        fontSize:23,
        fontWeight:'bold',
        width: "100%"

    },

    Touchable_no2: {
        width: "100%"
    }
})

const GET_ALL_PROJECTS = gql`
  {
    allProjects {
      nodes {
        projectId
        ownerId
        title
        externalLink
        createdAt
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
)(PostScreen)
