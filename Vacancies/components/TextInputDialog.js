import * as React from "react"
import { View } from "react-native"
import Dialog from "react-native-dialog"

export default (TextInputDialog = ({
  visible=false,
  title = "New Project Name",
  description = "What would you like to rename the project to?",
  value,
  onChangeText,
  onSubmit = () => {alert(value)}
}) => {
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Dialog.Input value={value} onChangeText={text => onChangeText(text)} />
        <Dialog.Button onPress={onSubmit}/>
      </Dialog.Container>
    </View>
  )
})
