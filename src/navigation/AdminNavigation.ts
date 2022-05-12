import { navigationItem } from "@core/navigation/NavigationTypes";
import { AppRoute } from "@const/AppRoute";
import { togglePerfilUser } from "@/features/slices/perfilSlice";
import storeApp from "@/features/store/storeApp";
import { Storage } from "@libs/storage";

export const AdminNavigation: navigationItem[] = [
  {
    title: "Asignación",
    screen: AppRoute.TableScreen,
    data: {
      applicationType: "Asignación",
      applicationName: "Asignación",
    },
  },
  {
    title: "Transporte",
    screen: AppRoute.TableScreen,
    data: {
      applicationType: "Transporte",
      applicationName: "Transporte",
    },
  },
  {
    title: "Préstamo",
    screen: AppRoute.TableScreen,
    data: {
      applicationType: "Préstamo Sueldo Base",
      applicationName: "Préstamo",
    },
  },
  {
    title: "Anticipo",
    screen: AppRoute.TableScreen,
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
        screen: AppRoute.TableScreen,
        data: {
          applicationType: "Beca",
          applicationName: "Beca",
        },
      },
    ],
  },
  {
    title: "Alojamiento",
    screen: AppRoute.TableScreen,
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
    title: "Modo Usuario",
    onPress: async () => {
      try {
        const userData = await Storage.getUserData();

        const newUserData = { ...userData, perfil: 6 };

        const res = await Storage.storeUserData(newUserData);

        if (res) {
          await storeApp.dispatch(togglePerfilUser());
        } else {
          throw Error("No cambio perfil");
        }
      } catch (err: unknown) {
        throw Error(err);
      }
    },
  },
];
