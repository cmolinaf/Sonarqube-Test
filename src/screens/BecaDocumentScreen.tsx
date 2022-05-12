import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BecaDocumentView from "@/views/BecaDocument/BecaDocumentView";
import { RootStackParamList } from "../@core/types/RootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "BecaDocumentScreen">;

const BecaDocumentScreen: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <BecaDocumentView {...route.params} />
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

export default BecaDocumentScreen;
