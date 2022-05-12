import React from "react";
import { Button as RNEButton, ButtonProps } from "react-native-elements";
import { $color } from "@/assets/colors";

export interface CustomButtonTypes extends ButtonProps {
  contentType?: "filled" | "outline" | "clean";
  variant?: keyof typeof $color;
  flex?: number;
}

const Button: React.FC<CustomButtonTypes> = (props) => {
  const { contentType = "outline", variant = "primary", flex = 1 } = props;
  const currentColor = $color[variant];
  return (
    <RNEButton
      containerStyle={{
        width: "100%",
        borderRadius: 8,
        flex: flex,
      }}
      buttonStyle={{
        borderRadius: 8,
        borderColor: contentType === "clean" ? "transparent" : currentColor,
        borderWidth: 1,
        backgroundColor: contentType !== "filled" ? "white" : currentColor,
        paddingHorizontal: 16,
        paddingVertical: 7,
      }}
      loadingStyle={{}}
      disabledStyle={{
        backgroundColor:
          contentType !== "filled" ? "white" : `${currentColor}81`,
        borderColor:
          contentType === "clean" ? "transparent" : `${currentColor}81`,
      }}
      disabledTitleStyle={{
        color: "white",
      }}
      titleStyle={{
        color: contentType !== "filled" ? currentColor : "white",
      }}
      {...props}
    />
  );
};

export default Button;
