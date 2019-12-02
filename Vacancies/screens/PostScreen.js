import React from "react"
import {
    AsyncStorage,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Text,
    TextInput } from "react-native"

import { withTheme, ScreenContainer, Button } from "@draftbit/ui"
import { graphql } from "react-apollo"
import { compose } from "recompose"
import gql from "graphql-tag"
import { draftbit as screenTheme } from "../config/Themes"
import { ProjectCard } from "../components"


class PostScreen extends React.Component {
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

export default PostScreen