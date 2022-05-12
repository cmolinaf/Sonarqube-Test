import React, { useState } from "react";
import { View } from "react-native";
import { ButtonProps } from "react-native-elements";
import { navigationItem } from "../NavigationTypes";
import Button from "@core/elements/Button/Button";
import { $color } from "@/assets/colors";

interface Props extends ButtonProps {
  navigationItem: navigationItem;
  level: number;
}

const NavigationDropdownButton: React.FC<Props> = ({
  navigationItem,
  level,
  children,
  ...buttonProps
}) => {
  const [showChildItems, setShowChildItems] = useState(false);

  return (
    <View
      style={{
        marginHorizontal: level < 3 ? 20 : 0,
      }}
    >
      <Button
        {...buttonProps}
        title={navigationItem.title}
        contentType={showChildItems ? "filled" : "outline"}
        variant={level > 1 ? "warning" : "primary"}
        iconPosition="right"
        icon={{
          name: showChildItems ? "arrow-drop-down" : "arrow-right",
          size: 25,
          color: showChildItems
            ? "white"
            : level > 1
            ? $color.warning
            : $color.primary,
        }}
        containerStyle={{
          marginBottom: 20,
        }}
        onPress={() => {
          setShowChildItems(!showChildItems);
        }}
      />
      {showChildItems && <>{children}</>}
    </View>
  );
};

export default NavigationDropdownButton;
