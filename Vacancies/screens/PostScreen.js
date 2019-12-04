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

class PostScreen extends React.Component {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle("dark-content")
    }

    state = {
        companyName: "Company Name",
        companyDetails: "Company Details",
        vacancyPay: "Pay (if applicable)"
    }

    post = async() => {

    }

    // login = async () => {
    //     const { Authenticate } = this.props
    //     const { formEmail, formPassword } = this.state
    //     AsyncStorage.removeItem("token")
    //     try {
    //         const response = await Authenticate({
    //             variables: {
    //                 input: {
    //                     email: formEmail,
    //                     password: formPassword
    //                 }
    //             }
    //         })
    //         await AsyncStorage.setItem("token", response.data.authenticate.jwtToken)
    //         this.props.navigation.navigate("Main_App")
    //     } catch (e) {
    //         alert(e)
    //     }
    // }

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
                            onPress={async () => await this.post()}>
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


export default (withTheme(PostScreen))
