import React from 'react'
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


class ProjectScreen extends React.Component {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle("dark-content")
    }

    render() {
        return (<Text> Hello  </Text>)

    }
}


// const GET_PROJECT = gql`
//   {
//     getCurrentProject {
//       projectId
//     }
//   }
// `

export default ProjectScreen