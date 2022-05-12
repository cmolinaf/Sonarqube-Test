import { IconProps } from "react-native-elements";

export interface chartListTypes {
  icon?: IconProps;
  title: string;
  subtitle: string;
  counter: string | number;
  id_solicitud: number;
  total: number;
}
