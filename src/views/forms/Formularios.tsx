import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { $color } from "@/assets/colors";
import { getServiceIndex, serviceTypeId } from "@const/ServiceType";
import {
  Anticipo,
  Asignacion,
  BecaEducacional,
  Alojamiento,
  Prestamo,
  Transporte,
} from "./formTemplates";

interface Props {
  applicationType: keyof typeof serviceTypeId;
  applicationName: string;
}

const Formulario: React.FC<Props> = ({ applicationType, applicationName }) => {
  const serviceType = getServiceIndex(applicationType);

  const selectedForm = () => {
    switch (serviceType) {
      case 1:
        return <Transporte />;
      case 2:
        return <Prestamo />;
      case 3:
        return <Anticipo />;
      case 4:
        return <Asignacion />;
      case 5:
        return <BecaEducacional />;
      case 9:
        return <Alojamiento />;

      default:
        return null;
    }
  };

  return (
    <Card
      containerStyle={{
        paddingHorizontal: 0,
        borderRadius: 16,
        marginBottom: 16,
      }}
    >
      <Text
        h4
        h4Style={{
          textAlign: "center",
          marginBottom: 16,
          fontSize: 20,
          color: $color.secundary,
        }}
      >
        {`Solicitud de ${applicationName}`}
      </Text>
      <View style={{ marginHorizontal: 16 }}>{selectedForm()}</View>
    </Card>
  );
};

export default Formulario;
