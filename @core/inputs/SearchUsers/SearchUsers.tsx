import React, { useState } from "react";
import { Text, View } from "react-native";
import { $color } from "@/assets/colors";
import Button from "@core/elements/Button/Button";
import { searchSingleItemProps } from "@core/elements/Search";
import Input from "../Input";
import ModalPasajerosExternos from "./components/ModalPasajerosExternos";
import ModalPasajerosInternos from "./components/ModalPasajerosInternos";
import ModalVerPasajeros from "./components/ModalVerPasajeros";

export interface PasajerosProps extends searchSingleItemProps {
  Nombre: string;
  Id: number;
  direccion: string;
  telefono: string;
  Email?: string;
  FichaSap?: string;
  rut?: string;
  direccion_destino?: string;
}

export interface SearchUsersProps {
  label: string;
  internLabel?: string;
  externLabel?: string;
  value: PasajerosProps[];
  errorMessage?: string;
  onChange: (arg0: PasajerosProps[]) => void;
  searchRoute: (arg0: { searchValue: string }) => string;
  selectType: "multiselect" | "multiDeselect" | "select" | "noSelect";
  selectKeyToShow?: keyof PasajerosProps;
  selectPlaceholder?: string;
  useToolbar?: boolean;
}

const SearchUsers: React.FC<SearchUsersProps> = ({
  label,
  internLabel,
  externLabel,
  value,
  errorMessage,
  onChange,
  searchRoute,
  selectType,
  selectKeyToShow,
  selectPlaceholder,
  useToolbar = false,
}) => {
  const [modalPaseInternsVisible, setModalPaseInternsVisible] = useState(false);
  const [modalPaseExternsVisible, setModalPaseExternsVisible] = useState(false);
  const [modalViewPaseVisible, setModalViewPaseVisible] = useState(false);

  const handleSetUsers = async (users: PasajerosProps[]) => {
    onChange(users);
  };

  const handleNewUser = async (user: PasajerosProps) => {
    if (
      Array.isArray(value) &&
      (selectType === "multiselect" || selectType === "multiDeselect")
    ) {
      const fullUsersIds = await new Set(
        value.map((d: PasajerosProps) => d.Id)
      );
      const merged = await value.concat(
        [user].filter((d) => !fullUsersIds.has(d.Id))
      );
      onChange(merged);
    } else {
      onChange([user]);
    }
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 12,
        }}
      >
        <Text
          style={{
            marginBottom: 6,
            color: $color.secundary,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {`${label}${
            selectType === "multiselect" || selectType === "multiDeselect"
              ? `: ${value ? value.length : 0}`
              : ""
          }`}
        </Text>
        <Button
          title={internLabel ?? `${label} Internos`}
          containerStyle={{
            marginBottom: 26,
            marginTop: 6,
            borderRadius: 8,
          }}
          onPress={() => {
            setModalPaseInternsVisible(!modalPaseInternsVisible);
          }}
        />
        <Button
          title={externLabel ?? `${label} Externos`}
          containerStyle={{
            marginBottom: 26,
            borderRadius: 8,
          }}
          onPress={() => {
            setModalPaseExternsVisible(!modalPaseExternsVisible);
          }}
        />
        {selectType === "multiDeselect" ||
          (selectType === "multiselect" && (
            <Button
              title={`Ver ${label}`}
              variant="warning"
              containerStyle={{
                marginBottom: errorMessage ? 2 : 26,
                borderRadius: 8,
              }}
              onPress={() => setModalViewPaseVisible(!modalViewPaseVisible)}
            />
          ))}
        {selectType === "select" && selectKeyToShow && (
          <Input
            value={value && value[0] ? value[0][selectKeyToShow] : undefined}
            disabled
            containerStyle={{ paddingHorizontal: 0 }}
            placeholder={selectPlaceholder}
          />
        )}
        {!!errorMessage && (
          <Text
            style={{
              marginHorizontal: 16,
              paddingVertical: 4,
              fontSize: 12,
              color: $color.danger,
            }}
          >
            {errorMessage}
          </Text>
        )}
      </View>
      {/* modals */}
      <ModalPasajerosInternos
        isVisible={modalPaseInternsVisible}
        setVisible={(visible) => setModalPaseInternsVisible(visible)}
        pasajeros={value}
        setNewPasajeros={handleSetUsers}
        searchRoute={searchRoute}
        selectType={selectType}
        useToolbar={useToolbar}
      />
      <ModalPasajerosExternos
        isVisible={modalPaseExternsVisible}
        setVisible={(visible) => setModalPaseExternsVisible(visible)}
        setNewPasajeros={handleNewUser}
      />
      <ModalVerPasajeros
        isVisible={modalViewPaseVisible}
        setVisible={(visible) => setModalViewPaseVisible(visible)}
        pasajeros={value}
        setNewPasajeros={handleSetUsers}
        selectType="multiDeselect"
        useToolbar={useToolbar}
      />
    </>
  );
};

export default SearchUsers;
