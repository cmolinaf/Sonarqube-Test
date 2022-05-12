import React from "react";
import { StyleSheet, View } from "react-native";
import ApplicationDetails from "@/views/Application/ApplicationDetails";
import { RootStackParamList } from "../@core/types/RootStackParamList";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ApplicationScreen">;

const ApplicationScreen: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.contenedor}>
      <ApplicationDetails applicationData={route.params.data} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flex: 1,
  },
});

export default ApplicationScreen;
