import React from "react"
import { StatusBar, StyleSheet, KeyboardAvoidingView, Text } from "react-native"
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

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state

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
            <Text
              style={[
                styles.Text_na5,
                theme.typography.overline,
                {
                  color: theme.colors.medium
                }
              ]}>
              ENTER YOUR CREDENTIALS:
            </Text>
            <TextField
              style={styles.TextField_nds}
              type="solid"
              label="Email Address"
              placeholder="joe@example.com"
              keyboardType="email-address"
              leftIconMode="inset"
            />
            <TextField
              style={styles.TextField_n1l}
              type="solid"
              label="Password"
              placeholder="**********"
              leftIconMode="inset"
              secureTextEntry={true}
            />
            <Button
              style={styles.Button_na1}
              type="solid"
              color={theme.colors.primary}
              onPress={() => {
                this.props.navigation.navigate("Main_App")
              }}>
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
                    color: theme.colors.primary
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

export default withTheme(SignUpScreen)
