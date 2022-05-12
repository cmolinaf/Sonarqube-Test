import React from "react";
import { View } from "react-native";
import { Icon, IconProps, Text } from "react-native-elements";
import { $color } from "@/assets/colors";

interface Props {
  text: string | null | undefined;
  icon?: IconProps;
  fontBold?: boolean;
  variant?: keyof typeof $color;
}

const Badge: React.FC<Props> = ({
  text,
  icon,
  variant = "primary",
  fontBold = false,
}) => {
  if (text) {
    return (
      <View
        style={{
          padding: 6,
          margin: 2,
          borderRadius: 12,
          backgroundColor: `${$color[variant]}40`,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon && (
          <>
            <Icon {...icon} color={$color[variant]} size={18} />
            <Text> </Text>
          </>
        )}
        <Text
          style={{
            color: $color[variant],
            fontWeight: fontBold ? "bold" : "normal",
          }}
        >
          {text}
        </Text>
      </View>
    );
  }
  return null;
};

export default Badge;
