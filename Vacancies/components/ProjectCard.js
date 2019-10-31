import React from "react"
import { StyleSheet } from "react-native"
import * as PropTypes from "prop-types"
import { Container, CardBlock, Button, withTheme} from "@draftbit/ui"

const ProjectCard = ({theme}) => (
  <Container
    style={styles.Container_nec}
    elevation={0}
    borderColor={theme.colors.divider}
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
  </Container>);

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
})


ProjectCard.propTypes = { theme: PropTypes.any }

export default withTheme(ProjectCard)
