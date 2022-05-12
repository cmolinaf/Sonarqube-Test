import React from "react";
import { Card, Text } from "react-native-elements";
import { $color } from "@/assets/colors";

interface Props {
  text: string;
  title?: string;
}

const InformationCard: React.FC<Props> = ({ text, title = "Recuerda:" }) => {
  return (
    <Card
      containerStyle={{
        backgroundColor: $color.primary,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 0,
        marginHorizontal: 10,
        marginBottom: 12,
      }}
    >
      <Card.Title
        style={{
          color: "white",
          fontSize: 16,
          textAlign: "left",
          marginLeft: 7,
        }}
      >
        {title}
      </Card.Title>
      <Text
        style={{
          color: "white",
          marginLeft: 10,
          fontSize: 15,
          fontWeight: "900",
          textAlign: "left",
        }}
      >
        {text}
      </Text>
    </Card>
  );
};

export { InformationCard };
