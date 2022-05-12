import React, { useState } from "react";
import { View } from "react-native";
import Button from "../Button/Button";
import ModalVerPasajeros from "./components/ModalVerPasajeros";

export interface PasajerosProps {
  Nombre: string;
  Id: number;
  direccion: string;
  telefono: string;
  Email?: string;
  FichaSap?: string;
  rut?: string;
  direccion_destino?: string;
}

interface SearchUsersProps {
  label?: string;
  value: PasajerosProps[];
}

const ShowUsers: React.FC<SearchUsersProps> = ({
  label = "Pasajeros",
  value,
}) => {
  const [modalViewPaseVisible, setModalViewPaseVisible] = useState(false);

  return (
    <>
      <View
        style={{
          marginHorizontal: 12,
          marginBottom: 12,
        }}
      >
        <Button
          title={`Ver ${label}`}
          containerStyle={{
            borderRadius: 8,
          }}
          onPress={() => setModalViewPaseVisible(!modalViewPaseVisible)}
        />
      </View>
      {/* modals */}
      <ModalVerPasajeros
        isVisible={modalViewPaseVisible}
        setVisible={(visible) => setModalViewPaseVisible(visible)}
        pasajeros={value}
      />
    </>
  );
};

export default ShowUsers;
