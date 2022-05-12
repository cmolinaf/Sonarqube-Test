import { ApplicationProps } from "../../types";
import { serviceTypeId } from "../const/ServiceType";

export type RootStackParamList = {
  HomeScreen: { userID: number };
  LoginScreen: Record<string, unknown>;
  HomeTab: Record<string, unknown>;
  FormScreen: {
    applicationType: keyof typeof serviceTypeId;
    applicationName: string;
  };
  ApplicationScreen: {
    data: ApplicationProps;
  };
  BecaDocumentScreen: {
    applicationId: string;
    applicationUserUID: {
      [key: string]: unknown;
    }[];
    becaDocument: {
      nro_file: string;
      filename: string;
      tipo: string;
      descripcion: string;
      fecha_documento: string;
    }[];
  };
  ObservationChatScreen: {
    idSolicitud: string;
  };
  TableScreen: {
    applicationType: keyof typeof serviceTypeId;
    applicationName: string;
  };
};
