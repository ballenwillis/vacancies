import React from "react"
import { StyleSheet } from "react-native"
import * as PropTypes from "prop-types"
import { Container, CardBlock, Button, withTheme} from "@draftbit/ui"

const ProjectCard = ({theme, isOwner=false, isMember=false, ownerName="Brandon Willis", title="Build a dating app!", style}) => (
  <Container
    style={[styles.container, style]}
    elevation={0}
    borderColor={theme.colors.divider}
    useThemeGutterPadding={true}>
    <CardBlock
      style={styles.CardBlock_nve}
      icon="MaterialIcons/cloud"
      image="https://apps-draftbit-com.s3.amazonaws.com/apps/zYTsJNxi/assets/9e8d5125-43b4-4e87-ab69-a16a93d67a50"
      title={title}
      elevation={1}
      numColumns={3}
      aspectRatio={1.5}
      leftDescription={ownerName}
    />
    <Container style={styles.Container_n86} elevation={0} useThemeGutterPadding={true}>
      {isOwner ?<> <Button style={styles.Button_nl2} icon="FontAwesome/pencil" type="outline">
        Edit Project
      </Button>
       <Button style={styles.Button_nl2} icon="FontAwesome/trash-o" type="outline">
        Delete Project
      </Button></> :
        isMember ? null : <Button style={styles.Button_nl2} icon="FontAwesome/plus" type="outline">
        Request To Join
      </Button>
        }
    </Container>
  </Container>);

const styles = StyleSheet.create({
  Button_n3l: {
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    marginHorizontal: 16,
    marginTop: 32
  },
  CardBlock_nve: {
    padding: 4,
    paddingTop: 0,
    marginTop: 32
  },
  Container_n86: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 16
  },
  container: {
    borderWidth: 2,
    borderRadius: 8
  }
})


ProjectCard.propTypes = { theme: PropTypes.any }

export default withTheme(ProjectCard)
