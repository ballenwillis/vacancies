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
import { draftbit as screenTheme } from "../config/Themes"
import {
    withTheme,
    ScreenContainer,
    Container,
    Image,
    TextField,
    Button,
    Touchable
} from "@draftbit/ui"
import Images from "../config/Images.js"

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle("dark-content")
    }

    state = {
        formFirstName: "",
        formLastName: "",
        formEmail: "",
        formPassword: "",
        formWorkHistory: "",
        formWorkSkills: "",
        formWorkSector: "Healthcare"
    }

    signUp = async () => {
        const { RegisterUser } = this.props
        const { formFirstName, formLastName, formEmail, formPassword, formWorkHistory, formWorkSector, formWorkSkills } = this.state
        AsyncStorage.removeItem("token")
        try {
            const response = await RegisterUser({
                variables: {
                    input: {
                        firstName: formFirstName,
                        lastName: formLastName,
                        email: formEmail,
                        work_history:formWorkHistory,
                        work_skills:formWorkSkills,
                        sector:formWorkSector,
                        password: formPassword
                    }
                }
            })
            await AsyncStorage.setItem("token", response.data.registerUser.jwtToken)
            this.props.navigation.navigate("Main_App")
        } catch (e) {
            alert("Oops... something went wrong... try again")
        }
    }

    render() {
        const { formFirstName, formLastName, formEmail, formPassword, formWorkHistory, formWorkSkills, formWorkSector, loggingIn } = this.state
        const { theme } = this.props
        return (
            <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_ni5}>
                <KeyboardAvoidingView
                    style={styles.KeyboardAvoidingView_noy}
                    enabled={true}
                    behavior="padding"
                    keyboardVerticalOffset={0}>
                    <Container style={styles.Container_nt4} elevation={0} useThemeGutterPadding={true}>
                        <Image style={styles.Image_nrg} source={Images.Logo} resizeMode="contain" />
                        <Text>{'\n'}</Text>
                        <Text
                            style={styles.Text_heading}>
                            Vacancies: Register
                        </Text>
                    </Container>
                    <Container style={styles.Container_nkd} elevation={0} useThemeGutterPadding={true}>

                      <Text
                        style={styles.TextField_Label}>
                        First Name
                      </Text>
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="First Name"
                            placeholder="joe"
                            leftIconMode="inset"
                            onChangeText={firstName => this.setState({ formFirstName: firstName })}
                            value={formFirstName}
                        />

                      <Text
                        style={styles.TextField_Label}>
                        Last Name
                      </Text>
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Last Name"
                            placeholder="Smith"
                            leftIconMode="inset"
                            onChangeText={lastName => this.setState({ formLastName: lastName })}
                            value={formLastName}
                        />

                      <Text
                        style={styles.TextField_Label}>
                        Email Address
                      </Text>
                        <TextInput
                            style={styles.TextField_nds}
                            type="solid"
                            label="Email Address"
                            placeholder="joe@example.com"
                            keyboardType="email-address"
                            leftIconMode="inset"
                            onChangeText={email => this.setState({ formEmail: email })}
                            value={formEmail}
                        />

                      <Text
                        style={styles.TextField_Label}>
                        Work History
                      </Text>
                      <TextInput
                        style={styles.TextField_nds}
                        type="solid"
                        label="Work History"
                        multiline = {true}
                        numberOfLines={4}
                        placeholder="Work History: ex. Nasa Embedded Engineer 5 Years..."
                        leftIconMode="inset"
                        onChangeText={workHistory => this.setState({ formWorkHistory: workHistory })}
                        value={formWorkHistory}
                      />
                      <Text
                        style={styles.TextField_Label}>
                        Work Skills
                      </Text>
                      <TextInput
                        style={styles.TextField_nds}
                        type="solid"
                        label="Work Skills"
                        placeholder="Work Skills: Leadership, Hospitality, Engineering...etc."
                        leftIconMode="inset"
                        onChangeText={workSkill => this.setState({ formWorkSkills: workSkill })}
                        value={formWorkSkills}
                      />


                      <Text
                        style={styles.TextField_Label}>
                        Work Sector
                      </Text>

                      <Picker
                        selectedValue={formWorkSector}
                        // style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({formWorkSector: itemValue})
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

                      <Text
                        style={styles.TextField_Label}>
                          Password
                      </Text>

                        <TextInput
                            style={styles.TextField_n1l}
                            type="solid"
                            label="Password"
                            placeholder="**********"
                            leftIconMode="inset"
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ formPassword: password })}
                            value={formPassword}
                        />
                        <Button
                            style={styles.Button_na1}
                            type="solid"
                            color={theme.colors.light}
                            onPress={async () => await this.signUp()}>
                            SIGN UP
                        </Button>
                        <Touchable
                            style={styles.Touchable_no2}
                            onPress={() => {
                                this.props.navigation.navigate("LoginScreen")
                            }}>
                            <Text
                                style={[
                                    styles.Text_ndm,
                                    theme.typography.button,
                                    {
                                        color: theme.colors.light
                                    }
                                ]}>
                                Already have an account? Sign In
                            </Text>
                        </Touchable>
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
                            By tapping "Sign In", you agree to our Terms of Service, Privacy Policy and Cookie
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
        height: 64,
        marginBottom: 4
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

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      jwtToken
    }
  }
`

export default graphql(REGISTER_USER, { name: "RegisterUser" })(withTheme(SignUpScreen))
