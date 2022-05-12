import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { $color } from "@/assets/colors";

const FAQ = () => {
  return (
    <View>
      <Card containerStyle={styles.card}>
        <Card.Title h3 h3Style={{ color: $color.primary, textAlign: "left" }}>
          ¿Como cambio mi contraseña?
        </Card.Title>
        <Card.Divider />
        <Text>
          Para cambiar tu contraseña, debes ingresar a tu perfil presionando tu
          nombre en el menu laterial.
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
});

export default FAQ;
