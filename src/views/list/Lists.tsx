import React from "react";
import { View } from "react-native";
import { Card } from "react-native-elements";
import { serviceTypeId } from "@const/ServiceType";
import ListView from "./ListView";

interface Props {
  applicationType: keyof typeof serviceTypeId;
  applicationName: string;
}
const Lists: React.FC<Props> = ({ applicationType, applicationName }) => {
  return (
    <Card
      containerStyle={{
        paddingHorizontal: 0,
        borderRadius: 16,
        marginBottom: 16,
      }}
    >
      <View style={{ marginHorizontal: 16 }}>
        <ListView
          title={`Solicitudes ${applicationName}`}
          type={applicationType}
        />
      </View>
    </Card>
  );
};

export default Lists;
