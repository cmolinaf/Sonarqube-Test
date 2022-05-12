import React from "react";
import { Linking, View } from "react-native";
import { ButtonProps } from "react-native-elements";
import { $color } from "@/assets/colors";
import Button from "@core/elements/Button/Button";
import NavigationButton from "./components/NavigationButton";
import NavigationDropdownButton from "./components/NavigationDropdownMenu";
import { navigationItem } from "./NavigationTypes";

interface Props extends ButtonProps {
  navigationList: navigationItem[];
  level?: number;
}

const NavigationMenu: React.FC<Props> = ({ navigationList, level = 0 }) => {
  return (
    <>
      {navigationList &&
        navigationList.map((item, index) => {
          if (item.child) {
            // recursive this component
            return (
              <NavigationDropdownButton
                key={`navigation-menu-dropdown-button-${level}-${item.title}`}
                navigationItem={item}
                level={level + 1}
              >
                <>
                  <NavigationMenu
                    navigationList={item.child}
                    level={level + 1}
                  />
                  {(level < 2 ||
                    item.child.length > 1 ||
                    item.child.some((newItem) => !newItem.child)) && (
                    <View
                      style={{
                        height: 3,
                        borderRadius: 3,
                        backgroundColor: $color.primary,
                        marginBottom: 20,
                        marginHorizontal: 20,
                      }}
                    />
                  )}
                </>
              </NavigationDropdownButton>
            );
          } else if (item.screen) {
            return (
              <NavigationButton
                key={`navigation-menu-button-${level}-${item.title}`}
                navigationItem={item}
                variant={item.variant ? item.variant : undefined}
                contentType={item.contentType ? item.contentType : undefined}
                containerStyle={{
                  marginBottom:
                    index < navigationList.length - 1 || level > 0 ? 20 : 0,
                }}
              />
            );
          } else {
            return (
              <Button
                title={item.title}
                key={`navigation-menu-action-button-${level}-${item.title}`}
                containerStyle={{
                  marginHorizontal: 20,
                  marginBottom:
                    index < navigationList.length - 1 || level > 0 ? 20 : 0,
                }}
                iconPosition="right"
                variant={item.variant ? item.variant : undefined}
                contentType={item.contentType ? item.contentType : undefined}
                icon={
                  item.url
                    ? {
                        name: "link",
                        size: 22,
                        color: $color.primary,
                      }
                    : undefined
                }
                onPress={
                  item.url || item.onPress
                    ? () => {
                        if (item.url) Linking.openURL(item.url);
                        if (item.onPress) item.onPress();
                      }
                    : undefined
                }
              />
            );
          }
        })}
    </>
  );
};

export default NavigationMenu;
