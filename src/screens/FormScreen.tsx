import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Formulario from "@/views/forms/Formularios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@core/types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "FormScreen">;

const FormScreen: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <Formulario {...route.params} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flex: 1,
  },
});

export default FormScreen;
