import React from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import { draftbit as screenTheme } from "../config/Themes"
import { withTheme, ScreenContainer, Container, CardBlock, Button } from "@draftbit/ui"
import * as PropTypes from "prop-types"

const ProjectCard = () =>
  withTheme(
    <Container
      style={styles.Container_nec}
      elevation={0}
      borderColor={props.theme.colors.divider}
      useThemeGutterPadding={true}>
      <CardBlock
        style={styles.CardBlock_nve}
        icon="MaterialIcons/cloud"
        image="https://apps-draftbit-com.s3.amazonaws.com/apps/zYTsJNxi/assets/9e8d5125-43b4-4e87-ab69-a16a93d67a50"
        title="[Title]"
        elevation={1}
        numColumns={3}
        aspectRatio={1.5}
        leftDescription="[user name]"
      />
      <Container style={styles.Container_n86} elevation={0} useThemeGutterPadding={true}>
        <Button style={styles.Button_nl2} icon="FontAwesome/pencil" type="outline">
          Edit Project
        </Button>
        <Button style={styles.Button_nl2} icon="FontAwesome/trash-o" type="outline">
          Get Started
        </Button>
        <Button style={styles.Button_nl2} icon="FontAwesome/plus" type="outline">
          Request To Join
        </Button>
      </Container>
    </Container>
  )

ProjectCard.propTypes = { theme: PropTypes.any }

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
  Button_n3l: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    marginHorizontal: 16,
    marginTop: 32
  },
  CardBlock_nve: {
    paddingHorizontal: 16,
    paddingTop: 0,
    marginTop: 32
  },
  Container_n86: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 16
  },
  Root_nug: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  }
})

export default withTheme(MainScreen)
