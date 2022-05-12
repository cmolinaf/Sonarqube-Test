import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppRoute } from "@const/AppRoute";
import Screens from "@/screens";
import { Icon } from "react-native-elements";
import { $color } from "@/assets/colors";
import { Linking } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigations = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarActiveTintColor: $color.primary,
        tabBarInactiveTintColor: $color.secundary,
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 70 },
        tabBarIcon: ({ color, size }) => {
          let iconName = "error-outline";
          let iconType = "material";
          const rn = route.name;

          if (rn == AppRoute.HomeTab) {
            iconName = "home-outline";
            iconType = "material-community";
          } else if (rn === AppRoute.FAQTab) {
            iconName = "help-circle-outline";
            iconType = "material-community";
          } else if (rn === AppRoute.CallTab) {
            iconName = "call";
          }

          return (
            <Icon name={iconName} type={iconType} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen
        name={AppRoute.HomeTab}
        component={Screens.HomeTab}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={AppRoute.FAQTab}
        component={Screens.FAQTab}
        options={{ title: "Ayuda" }}
      />
      <Tab.Screen
        name={AppRoute.CallTab}
        component={Screens.CallTab}
        options={{ title: "Llamar" }}
        listeners={() => ({
          tabPress: () => {
            Linking.openURL("tel:123456789");
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigations;
