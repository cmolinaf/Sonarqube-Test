import React from "react";
import { Modal, ModalProps, View } from "react-native";
import { Search } from "@core/elements/Search";
import { PasajerosProps } from "@core/elements/showUsers/ShowUsers";
import Badge from "../../Badge/Badge";
import RenderItem from "./RenderItem";

interface Props extends ModalProps {
  isVisible: boolean;
  setVisible: (arg0: boolean) => void;
  setNewPasajeros?: (arg0: PasajerosProps[]) => void;
  pasajeros: PasajerosProps[];
  canSelect?: boolean;
}

const ModalVerPasajeros: React.FC<Props> = (props) => {
  const {
    isVisible,
    setVisible,
    setNewPasajeros,
    pasajeros,
    canSelect = false,
  } = props;

  return (
    <Modal
      {...props}
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={() => {
        setVisible(!isVisible);
      }}
    >
      <View
        style={{
          backgroundColor: "#3333338b",
          height: "100%",
          width: "100%",
        }}
      >
        <Search
          data={pasajeros}
          onReady={({ items }) => {
            if (setNewPasajeros && canSelect) {
              setNewPasajeros(items as PasajerosProps[]);
            }
            setVisible(!isVisible);
          }}
          keyOfCheck="Id"
          RenderItem={(props) => <RenderItem {...props} />}
          keyExtractor={(item) => `item-user-${item.Id}`}
          SearchToolbar={({ items }) => {
            return (
              <Badge
                text={`Usuarios Seleccionados: ${items.length}`}
                fontBold
              />
            );
          }}
          selectType="noSelect"
          isVisible={isVisible}
        />
      </View>
    </Modal>
  );
};

export default ModalVerPasajeros;
