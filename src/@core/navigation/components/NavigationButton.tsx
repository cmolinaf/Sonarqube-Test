import React from "react";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { navigationItem } from "../NavigationTypes";
import Button, { CustomButtonTypes } from "@core/elements/Button/Button";
import { RootStackParamList } from "@core/types/RootStackParamList";

interface screenParams {
  title: string;
  param: Record<string, unknown>;
}

interface Props extends CustomButtonTypes {
  navigationItem: navigationItem;
}

const NavigationButton: React.FC<Props> = ({
  navigationItem,
  ...buttonProps
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Button
        {...buttonProps}
        title={navigationItem.title}
        onPress={async () => {
          if (navigationItem.onPress) navigationItem.onPress();
          const parametros: screenParams = await {
            title: `${navigationItem.screen}`,
            param: navigationItem.data ?? {},
          };
          navigation.navigate(
            parametros.title as never,
            parametros.param as never
          ); // corregir typos
        }}
      />
    </View>
  );
};

export default NavigationButton;
