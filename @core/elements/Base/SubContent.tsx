import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { $color } from "@/assets/colors";

interface Props {
  title?: string;
  isLoading?: boolean;
  isChildrenVoid?: boolean;
}

const SubContent: React.FC<Props> = ({
  title,
  isLoading = false,
  children,
  isChildrenVoid = true,
}) => {
  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* content */}
      <View style={styles.childrenContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={$color.warning} />
        ) : (
          <>
            {isChildrenVoid ? (
              children
            ) : (
              <View style={styles.errorContainer}>
                <Text>Nada que Mostrar</Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginTop: 16,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  childrenContainer: {},
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SubContent;
