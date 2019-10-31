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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("dark-content")
  }

  state = {
    formEmail: "Temp@temp.com",
    formPassword: "Temporary123"
  }

  async componentDidMount() {
    await AsyncStorage.removeItem("token")
  }

  login = async () => {
    const { Authenticate } = this.props
    const { formEmail, formPassword } = this.state
    AsyncStorage.removeItem("token")
    try {
      const response = await Authenticate({
        variables: {
          input: {
            email: formEmail,
            password: formPassword
          }
        }
      })
      await AsyncStorage.setItem("token", response.data.authenticate.jwtToken)
      this.props.navigation.navigate("Main_App")
    } catch (e) {
      alert(e)
    }
  }

  render() {
    const { formPassword, formEmail } = this.state
    const { theme } = this.props
    return (
      <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_ni5}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoidingView_noy}
          enabled={true}
          behavior="padding"
          keyboardVerticalOffset={0}>
          <Container style={styles.Container_nt4} elevation={0} useThemeGutterPadding={true}>
            <Image style={styles.Image_nrg} source={Images.BuildPng6} resizeMode="contain" />
            <Text
              style={[
                styles.Text_nie,
                theme.typography.headline5,
                {
                  color: theme.colors.primary
                }
              ]}>
              Vacancies: Where Dreamers and Builders Create
            </Text>
          </Container>
          <Container style={styles.Container_nkd} elevation={0} useThemeGutterPadding={true}>
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
              color={theme.colors.primary}
              onPress={async () => await this.login()}>
              SIGN IN
            </Button>
            <Touchable
              style={styles.Touchable_no2}
              onPress={() => {
                this.props.navigation.navigate("SignUpScreen")
              }}>
              <Text
                style={[
                  styles.Text_ndm,
                  theme.typography.button,
                  {
                    color: theme.colors.primary
                  }
                ]}>
                Create Account
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
  Touchable_no2: {
    width: "100%"
  }
})

const AUTHENTICATE = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      jwtToken
    }
  }
`

export default graphql(AUTHENTICATE, { name: "Authenticate" })(withTheme(LoginScreen))
