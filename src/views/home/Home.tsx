import React from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { $color } from "@/assets/colors";
import { Background } from "@core/elements/Background";

interface Props {
  children: React.ReactNode;
}

const Home: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Background style={styles.background} />
        <Card containerStyle={styles.card}>
          <View>{children}</View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: $color.primary,
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
  },
  background: {
    height: ScreenHeight / 4,
  },
  card: {
    width: "100%",
    margin: 0,
    paddingHorizontal: 0,
    borderRadius: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  list: {
    marginRight: Platform.OS == "ios" ? 0 : 8,
    marginLeft: Platform.OS == "ios" ? 0 : 8,
  },
});

export default Home;
