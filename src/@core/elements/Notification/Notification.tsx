import React from "react";
import { View } from "react-native";
import { Card, Button } from "react-native-elements";
import { $color } from "@/assets/colors";

const Notification = () => {
  return (
    <View style={{}}>
      <Card
        containerStyle={{
          backgroundColor: $color.primary,
          borderRadius: 15,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Card.Title style={{ color: "white", fontSize: 16 }}>
          Tu solicitud fue aprobada.
        </Card.Title>
        <Button
          buttonStyle={{ borderRadius: 10, backgroundColor: "#c388de" }}
          title="Ver más"
        />
      </Card>
    </View>
  );
};

export default Notification;
