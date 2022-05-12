import { CustomButtonTypes } from "@core/elements/Button/Button";

export interface navigationItem {
  title: string;
  screen?: string;
  variant?: CustomButtonTypes["variant"];
  contentType?: CustomButtonTypes["contentType"];
  profile?: number | number[];
  data?: {
    [key: string]: string;
  };
  url?: string;
  child?: navigationItem[];
  onPress?: () => void;
}
