import React from "react";
import { StyleSheet, View } from "react-native";
import ObservationChat from "@/views/ObservationChat/ObservationChat";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@core/types/RootStackParamList";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ObservationChatScreen"
>;

const ObservationChatScreen: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.contenedor}>
      <ObservationChat {...route.params} />
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flex: 1,
  },
});

export default ObservationChatScreen;
