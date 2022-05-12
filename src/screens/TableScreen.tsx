import React from "react";
import { StyleSheet, View } from "react-native";
import Lists from "@/views/list/Lists";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@core/types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "TableScreen">;

const TableScreen: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.contenedor}>
      <Lists {...route.params} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flex: 1,
  },
});

export default TableScreen;
