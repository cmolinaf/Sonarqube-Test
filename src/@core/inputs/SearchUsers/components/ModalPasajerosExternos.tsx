import React, { useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Modal, ModalProps, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-elements";
import Button from "@core/elements/Button/Button";
import FormInput from "@core/forms/formInputs/FormInput";

interface Props extends ModalProps {
  isVisible: boolean;
  setVisible: (arg0: boolean) => void;
  setNewPasajeros: (arg0: DataPropsWithoutSelect) => void;
}

interface DataPropsWithoutSelect {
  Nombre: string;
  Id: number;
  direccion: string;
  telefono: string;
  Email?: string;
  FichaSap?: string;
  rut?: string;
  direccion_destino?: string;
}

const INPUT_FIELDS = {
  nombre: "Nombre",
  rut: "rut",
  direccion_origen: "direccion",
  direccion_destino: "direccion_destino",
  telefono: "telefono",
};

interface FormValues {
  Nombre: string;
  rut: string;
  direccion: string;
  direccion_destino: string;
  telefono: string;
}

const ModalPasajerosExternos: React.FC<Props> = (props) => {
  const formMethods = useForm<FormValues>();
  const { isVisible, setVisible, setNewPasajeros } = props;
  const [nextId, setNextId] = useState(1000000);

  const resetValues = () => {
    formMethods.reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    const newDataAux: DataPropsWithoutSelect = await { ...form, Id: nextId };
    setNextId(nextId + 1);

    setNewPasajeros(newDataAux);
    setVisible(!isVisible);

    throw Error;
  };

  const onErrors: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("error:", errors);
    throw Error;
  };

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
      <ScrollView
        style={{
          backgroundColor: "#3333338b",
          height: "100%",
          width: "100%",
        }}
      >
        <Card
          containerStyle={{
            paddingHorizontal: 0,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <View style={{ marginHorizontal: 16 }}>
            <Text
              h4
              h4Style={{ textAlign: "center", fontSize: 20, marginBottom: 12 }}
            >
              Formulario de Pasajero Externo
            </Text>
            <FormProvider {...formMethods}>
              <FormInput
                name={INPUT_FIELDS.nombre}
                label="Nombre"
                placeholder="Nombre"
                keyboardType="default"
                rules={{ required: "El Nombre es requerido!" }}
              />
              <FormInput
                name={INPUT_FIELDS.rut}
                label="RUT"
                placeholder="RUT"
                keyboardType="numeric"
                rules={{ required: "El Rut es requerido!" }}
              />
              <FormInput
                name={INPUT_FIELDS.direccion_origen}
                label="Dirección Origen"
                placeholder="Dirección Origen"
                keyboardType="default"
                rules={{ required: "La Dirección Origen es requerida!" }}
              />
              <FormInput
                name={INPUT_FIELDS.direccion_destino}
                label="Dirección Destino"
                placeholder="Dirección Destino"
                keyboardType="default"
                rules={{ required: "La Dirección Destino es requerida!" }}
              />
              <FormInput
                name={INPUT_FIELDS.telefono}
                label="Teléfono"
                placeholder="Teléfono"
                keyboardType="phone-pad"
                rules={{ required: "El Teléfono es requerido!" }}
              />
            </FormProvider>
            <Button
              title="Guardar"
              containerStyle={{
                width: "100%",
                borderRadius: 8,
                marginBottom: 16,
              }}
              onPress={formMethods.handleSubmit(onSubmit, onErrors)}
            />
            <Button
              title="Salir sin Guardar"
              variant="warning"
              containerStyle={{
                width: "100%",
                borderRadius: 8,
              }}
              onPress={() => {
                resetValues();
                setVisible(!isVisible);
              }}
            />
          </View>
        </Card>
      </ScrollView>
    </Modal>
  );
};

export default ModalPasajerosExternos;
