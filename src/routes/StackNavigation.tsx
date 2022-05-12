import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { Storage } from '@libs/storage';
import { Storage } from "@libs/storage";
import TabNavigations from "./TabNavigations";
import { AppRoute } from "@const/AppRoute";
import Screens from "@/screens";

const Stack = createStackNavigator();

const StackNavigation = () => {
  const [initRoute, setInitRoute] = useState<string | null>(null);

  useEffect(() => {
    Storage.getUserData()
      .then(() => {
        setInitRoute(AppRoute.HomeScreen);
      })
      .catch(() => setInitRoute(AppRoute.LoginScreen));
  }, []);

  return (
    <>
      {initRoute && (
        <Stack.Navigator initialRouteName={initRoute}>
          <Stack.Screen
            name={AppRoute.LoginScreen}
            component={Screens.LoginScreen}
            options={{
              title: "Login",
              // headerTitleAlign: 'center',
              // headerTintColor: '#000',
              header: () => null,
              // headerTitleStyle: {
              //   fontWeight: 'bold',
              // },
            }}
          />
          <Stack.Screen
            name={AppRoute.HomeScreen}
            component={TabNavigations}
            options={{
              title: "PortalPersonas",
              // headerTitleAlign: 'center',
              // headerTintColor: '#000',
              header: () => null,
              headerLeft: () => null,
              // headerTitleStyle: {
              //   fontWeight: 'bold',
              // },
            }}
          />
          <Stack.Screen
            name={AppRoute.FormScreen}
            component={Screens.FormScreen}
            options={{
              title: "Formulario",
            }}
          />
          <Stack.Screen
            name={AppRoute.TableScreen}
            component={Screens.TableScreen}
            options={{
              title: "Lista",
            }}
          />
          <Stack.Screen
            name={AppRoute.ApplicationScreen}
            component={Screens.ApplicationScreen}
            options={{
              title: "Detalles de solicitud",
            }}
          />
          <Stack.Screen
            name={AppRoute.ObservationChatScreen}
            component={Screens.ObservationChatScreen}
            options={{
              title: "Observaciones",
            }}
          />
          <Stack.Screen
            name={AppRoute.BecaDocumentScreen}
            component={Screens.BecaDocumentScreen}
            options={{
              title: "Documentación",
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigation;
