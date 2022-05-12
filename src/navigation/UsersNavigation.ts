import { navigationItem } from "@core/navigation/NavigationTypes";
import { AppRoute } from "@const/AppRoute";
import { togglePerfilAdmin } from "@/features/slices/perfilSlice";
import storeApp from "@/features/store/storeApp";
import { Storage } from "@libs/storage";

export const UserNavigation: navigationItem[] = [
  {
    title: "Asignación",
    screen: AppRoute.FormScreen,
    data: {
      applicationType: "Asignación",
      applicationName: "Asignación",
    },
  },
  // {
  // 	title: 'Un Link',
  // 	screen: AppRoute.FormScreen,
  // 	url: 'https://facebook.com'
  // },
  {
    title: "Transporte",
    screen: AppRoute.FormScreen,
    data: {
      applicationType: "Transporte",
      applicationName: "Transporte",
    },
  },
  {
    title: "Préstamo",
    screen: AppRoute.FormScreen,
    data: {
      applicationType: "Préstamo Sueldo Base",
      applicationName: "Préstamo",
    },
  },
  {
    title: "Anticipo",
    screen: AppRoute.FormScreen,
    data: {
      applicationType: "Anticipo",
      applicationName: "Anticipo",
    },
  },
  {
    title: "Becas",
    child: [
      {
        title: "Beca Educacional",
        screen: AppRoute.FormScreen,
        data: {
          applicationType: "Beca",
          applicationName: "Beca",
        },
      },
    ],
  },
  {
    title: "Alojamiento",
    screen: AppRoute.FormScreen,
    data: {
      applicationType: "Alojamiento",
      applicationName: "Alojamiento",
    },
  },
  {
    title: "Salir",
    variant: "danger",
    contentType: "filled",
    screen: AppRoute.LoginScreen,
    onPress: async () => {
      try {
        console.log("funciono");
        await Storage.removeAll();
      } catch {
        console.error("error: can`t logout");
      }
    },
  },
  {
    title: "Modo Administrador",
    onPress: async () => {
      try {
        const userData = await Storage.getUserData();

        const newUserData = { ...userData, perfil: 1 };

        const res = await Storage.storeUserData(newUserData);

        if (res) {
          await storeApp.dispatch(togglePerfilAdmin());
        } else {
          throw Error("No cambio perfil");
        }
      } catch {
        throw Error;
      }
    },
  },
];
