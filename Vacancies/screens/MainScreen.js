import React from "react"
import { StatusBar, StyleSheet } from "react-native"
import { withTheme, ScreenContainer, Button } from "@draftbit/ui"
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

  render() {
    const { theme } = this.state

    return (
      <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_nug}>
        <ProjectCard theme={theme} />
        <Button
          style={styles.Button_n3l}
          icon="FontAwesome/angle-left"
          type="outline"
          onPress={() => {
            this.props.navigation.navigate("Navigator")
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
    alignContent: "center"
  }
})

export default withTheme(MainScreen)
