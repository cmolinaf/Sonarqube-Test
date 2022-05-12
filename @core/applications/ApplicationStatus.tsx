import React from "react";
import { Text, View } from "react-native";
import { $color } from "@/assets/colors";
import { statusTitles } from "@const/StatusTitles";

interface Props {
  status: number | string;
}

const ApplicationStatus: React.FC<Props> = ({ status }) => {
  const statusText = statusTitles;
  const statusColor = [
    "gray",
    $color.warning,
    $color.success,
    "gray",
    $color.danger,
  ];
  return (
    <View
      style={{
        backgroundColor:
          statusColor[typeof status === "string" ? parseInt(status) : status],
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {statusText[typeof status === "string" ? parseInt(status) : status]}
      </Text>
    </View>
  );
};

export default ApplicationStatus;
