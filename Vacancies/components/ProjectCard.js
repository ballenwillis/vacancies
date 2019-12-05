import React from "react"
import { Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import * as PropTypes from "prop-types"
import { Container, CardBlock, Button, withTheme } from "@draftbit/ui"
import AdaptiveCard from 'adaptivecards-reactnative'
import Moment from 'moment'

const ProjectCard = ({
                         theme,
                         isOwner = false,
                         isMember = false,
                         ownerName = "Team Vacancies",
                         title = "Build a team finding app!",
                         style,
                         onDelete = () => {},
                         onEdit = () => {},
                         onRequestJoin = () => {},
                         navigation,
                         description,
                         externalLink,
                         createdAt,
                         userSector,
                         projectSector,
                         backgroundColHit,
                         projectId
                     }) => {

const onPress = () =>  {
    navigation.navigate("ProjectScreen", {projectId})
}
const getCardJson = (ownerName, title, description, createdAt) => {
  return {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
       "version": "1.2",
    "style":"default",
    "bleed": true,
      "body": [
      {
        "type": "Container",
        "style":"default",

        "items": [
          {
            "type": "TextBlock",
            "text": title,
            "weight": "bolder",
            "size": "medium"
          },
          {
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "width": "auto",
              },
              {
                "type": "Column",
                "width": "stretch",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": ownerName,
                    "weight": "bolder",
                    "wrap": true
                  },
                  {
                    "type": "TextBlock",
                    "spacing": "none",
                    "text": "Created: " + Moment(createdAt).format('MMMM Do, YYYY'),
                    "isSubtle": true,
                    "wrap": true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Container",
        "items": [
          {
            "type": "TextBlock",
            "text": description,
            "wrap": true
          }

        ]
      }
    ],
      "actions": [
      {
        "type": "Action.ShowCard",
        "title": "Comment",
        "card": {
          "type": "AdaptiveCard",
          "body": [
            {
              "type": "Input.Text",
              "id": "comment",
              "isMultiline": true,
              "placeholder": "Enter your comment"
            }
          ],
          "actions": [
            {
              "type": "Action.Submit",
              "title": "OK"
            }
          ]
        }
      },

    ]
  }
  }
  const setBackgroundColor  = (backgroundColHit) => {
   console.log(backgroundColHit, userSector, projectSector)
    if (backgroundColHit &&
      (userSector.toLowerCase() === projectSector.toLowerCase())) {
      return "#FF0000"
    }
    return "#FFF"
  }

  return(
    <TouchableOpacity onPress = {onPress}>
      <Container style={{ backgroundColor: setBackgroundColor(backgroundColHit)}}>
        <CardBlock
          style={styles.CardBlock_nve}
          icon="MaterialIcons/cloud"
          image={externalLink}
          elevation={1}
          numColumns={3}
          aspectRatio={1.5}
        />
      <Container
        style={[styles.container, style]}
        elevation={0}
        borderColor={theme.colors.divider}
        useThemeGutterPadding={true}>
        <AdaptiveCard payload={getCardJson(ownerName, title, description, createdAt)}/>



        <Container style={styles.Container_n86} elevation={0} useThemeGutterPadding={true}>
          {isOwner ? (
            <>
              <Button
                style={styles.Button_nl2}

                type="outline"
                onPress={onEdit}>
                Edit Project
                <Image source = {require("../assets/images/edit.png")}
                       style={{width: 20, height: 20}}>

                </Image>

              </Button>
              <Button
                style={styles.Button_nl2}
                type="outline"
                onPress={onDelete}>
                Delete Project
                <Image source = {require("../assets/images/trash.png")}
                       style={{width: 25, height: 25}}>

                </Image>


              </Button>
            </>
          ) : isMember ? null : (
            null
            // <Button
            //   style={styles.Button_nl2}
            //   icon="FontAwesome/plus"
            //   type="outline"
            //   onPress={onRequestJoin}>
            //   Request To Join
            // </Button>
          )}
        </Container>




        </Container>
          <Text> {'\n'} </Text>

      </Container>
    </TouchableOpacity>


)}

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
        marginTop: 10,
        marginLeft:'auto',
        marginRight: 'auto'

    },
    Container_n86: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginVertical: 16
    },
    container: {
        backgroundColor: '#EAEAEA',
        borderWidth: 2,
        borderRadius: 8
    }
})

ProjectCard.propTypes = { theme: PropTypes.any }

export default withTheme(ProjectCard)
