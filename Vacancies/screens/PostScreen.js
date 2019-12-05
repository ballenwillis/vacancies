import React from "react"
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  AsyncStorage,
  TextInput,
  Picker
} from "react-native"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { withTheme, ScreenContainer, Container, Image, Button, Touchable } from "@draftbit/ui"
import Images from "../config/Images.js"
import {compose} from "recompose"
import jobs from "../jobs.json"

class PostScreen extends React.Component {
    constructor(props) {
        super(props)
        /*CAREFUL! Run this once to input scraped data from indeed.com into database. Then comment out!*/
        // this.setupJobsData()
        StatusBar.setBarStyle("dark-content")
    }

    state = {
        companyName: "Default Company Name",
        companyDetails: "Default Company Details",
        vacancyPay: "Default Pay (if applicable)",
        /* Default image */
        imageUrl: "https://apps-draftbit-com.s3.amazonaws.com/apps/zYTsJNxi/assets/9e8d5125-43b4-4e87-ab69-a16a93d67a50",
        workSector: "Healthcare"
    }

    setupJobsData = async () => {
        for (let job in jobs){
            let first_object = Object.keys(jobs[job])[0]
            let workSector = jobs[job]['sector']
            let inner_object = jobs[job][first_object]
            let companyName = inner_object['company_name']
            let companyDetails = inner_object['job_summary']
            let imageUrl = inner_object['company_img']
            // console.log(workSector, companyName, companyDetails, imageUrl)

              const { CreateProject, GetAllProjects, GetCurrentUser: {getCurrentUser: {userId}} } = this.props
              await CreateProject({
                variables: {
                  input: {
                    project: {
                      ownerId: userId,
                      title: companyName,
                      description: companyDetails,
                      externalLink: imageUrl,
                      sector: workSector
                    }
                  }
                }
              })

              GetAllProjects.refetch()
        }
    }

    // @TODO Why is creating projects here so slow? Takes so long to create a new project?
    onCreate = async () => {
        const { companyName, companyDetails, vacancyPay, imageUrl, workSector} = this.state
        const { CreateProject, GetAllProjects, GetCurrentUser: {getCurrentUser: {userId}} } = this.props
        await CreateProject({
            variables: {
                input: {
                    project: {
                        ownerId: userId,
                        title: companyName,
                        description: companyDetails,
                        externalLink: imageUrl,
                        sector: workSector
                    }
                }
            }
        })
        GetAllProjects.refetch()
      navigation.navigate()
    }

    render() {
        const { companyName, companyDetails, vacancyPay, imageUrl, workSector} = this.state
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
                      <Text>{'\n'}</Text>
                    </Container>
                    <Container style={styles.Container_nkd} elevation={0} useThemeGutterPadding={true}>

                      <Text
                        style={styles.TextField_Label}>
                        Company Name
                      </Text>
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Company Name"
                            placeholder="Company Name"
                            leftIconMode="inset"
                            onChangeText={name => this.setState({ companyName: name })}
                        />

                      <Text
                        style={styles.TextField_Label}>
                        Company Description
                      </Text>
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Company Description"
                            placeholder="Company Description"
                            leftIconMode="inset"
                            multiline = {true}
                            numberOfLines = {4}
                            onChangeText={details => this.setState({ companyDetails: details })}
                        />
                        <Text
                          style={styles.TextField_Label}>
                          Image Url
                        </Text>
                          <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Image URL"
                            placeholder="Image URL"
                            leftIconMode="inset"
                            onChangeText={url => this.setState({ imageUrl: url })}

                          />

                      <Text
                        style={styles.TextField_Label}>
                        Pay (if applicable)
                      </Text>

                      <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Pay (if applicable)"
                            placeholder="Pay (if applicable)"
                            leftIconMode="inset"
                            keyboardType = "decimal-pad"
                            onChangeText={pay => this.setState({ vacancyPay: pay })}
                      />

                      <Text
                        style={styles.TextField_Label}>
                        Work Sector
                      </Text>

                      <Picker
                        selectedValue={workSector}
                        // style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({workSector: itemValue})
                        }>
                        <Picker.Item label="Healthcare" value="Healthcare" />
                        <Picker.Item label="Information Technology" value="Information Technology" />
                        <Picker.Item label="Real Estate" value="Real Estate" />
                        <Picker.Item label="Retail" value="Retail" />
                        <Picker.Item label="Education" value="Education" />
                        <Picker.Item label="Government" value="Government" />
                        <Picker.Item label="Transportation" value="Transportation" />
                        <Picker.Item label="Food" value="Food" />

                      </Picker>


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
    },
    TextField_Label:{
      marginTop: 15
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
