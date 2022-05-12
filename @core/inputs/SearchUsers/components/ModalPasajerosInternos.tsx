import React from "react";
import { Modal, ModalProps, View } from "react-native";
import Badge from "@core/elements/Badge/Badge";
import { Search } from "@core/elements/Search";
import { PasajerosProps } from "@core/elements/showUsers/ShowUsers";
import RenderItem from "./RenderItem";

interface Props extends ModalProps {
  isVisible: boolean;
  setVisible: (arg0: boolean) => void;
  setNewPasajeros: (arg0: PasajerosProps[]) => void;
  pasajeros: PasajerosProps[];
  searchRoute: (arg0: { searchValue: string }) => string;
  selectType: "multiselect" | "multiDeselect" | "select" | "noSelect";
  useToolbar: boolean;
}

const ModalPasajerosInternos: React.FC<Props> = (props) => {
  const {
    isVisible,
    setVisible,
    setNewPasajeros,
    pasajeros,
    searchRoute,
    selectType,
    useToolbar,
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
            setNewPasajeros(items as PasajerosProps[]);
            setVisible(!isVisible);
          }}
          keyOfCheck="Id"
          selectType={selectType}
          RenderItem={(props) => <RenderItem {...props} />}
          keyExtractor={(item) => `item-user-${item.Id}`}
          SearchToolbar={
            useToolbar
              ? ({ items }) => {
                  return (
                    <Badge
                      text={`Usuarios Seleccionados: ${items.length}`}
                      fontBold
                    />
                  );
                }
              : undefined
          }
          searchRoute={searchRoute}
          isVisible={isVisible}
        />
      </View>
    </Modal>
  );
};

export default ModalPasajerosInternos;
