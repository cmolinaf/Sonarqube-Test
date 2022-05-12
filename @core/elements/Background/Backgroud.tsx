import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { $color } from "@/assets/colors";
import { Storage } from "@libs/storage";
// import { InformationCard } from "@core/elements/InformationCard";

interface Props {
  style: Record<string, unknown>;
}

const Background: React.FC<Props> = ({ style }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const perfilState = useSelector((state) => state.perfil.perfil);

  const isUserDataValid = async () => {
    try {
      const userData = await Storage.getUserData();

      setName(userData.no);
      setMail(userData.email);
    } catch {
      console.error("No user Data");
    }
  };

  useEffect(() => {
    isUserDataValid();
  }, []);
  return (
    <View
      style={{
        backgroundColor: $color.primary,
        justifyContent: "space-between",
        ...style,
      }}
    >
      <View
        // source={require('../assets/img/signature-background.jpg')}
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 16,
          height: 48,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Icon
          name="group-work"
          type="material"
          color="#fff"
          style={{ fontSize: 20 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginLeft: 6,
          }}
        >
          PortalPersonas
        </Text>
        {/* <InformationRequest text={`Hola ${name}`} title='Bienvenido'></InformationRequest> */}
      </View>
      <View
        style={{
          display: "flex",
          marginVertical: 12,
          paddingHorizontal: 24,
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
            marginBottom: 6,
          }}
        >
          Hola
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 19,
          }}
        >
          {name}
          <Text
            style={{
              color: "white",
              fontStyle: "italic",
              fontSize: 12,
            }}
          >
            {perfilState == 1 ? " Administrador" : ""}
          </Text>
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 16,
          }}
        >
          {mail}
        </Text>
      </View>
    </View>
  );
};

export default Background;
