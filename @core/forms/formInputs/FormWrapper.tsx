import React, { useState } from "react";
import {
  FormProvider,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { Modal, ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import Button from "@core/elements/Button/Button";
import Card from "@core/elements/Card/Card";
import { $color } from "@/assets/colors";

interface Props {
  name: string;
  title: string;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: string;
}

interface FormValues {
  [key: string]: unknown;
}

const FormWrapper: React.FC<Props> = (props) => {
  const { name, children } = props;

  const [isVisible, setVisible] = useState(false);

  const formMethods = useForm<FormValues>();

  const formState = useFormState();
  const { errors } = formState;

  const formContext = useFormContext();
  const { setValue } = formContext;

  // functions

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      setValue(name, form);
      setVisible(false);
      throw Error;
    } catch (err) {
      throw Error;
    }
  };

  const onErrors: SubmitErrorHandler<FormValues> = async (errors) => {
    console.error("error:", errors);
    throw Error;
  };

  const resetValues = () => {
    formMethods.reset();
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 12,
        }}
      >
        <Button
          title="Abrir Modal"
          containerStyle={{
            marginBottom: errors[name]?.message ? 2 : 26,
            borderRadius: 8,
          }}
          onPress={() => {
            setVisible(true);
          }}
        />
        {!!errors[name]?.message && (
          <Text
            style={{
              marginHorizontal: 16,
              paddingVertical: 4,
              fontSize: 12,
              color: $color.danger,
            }}
          >
            {errors[name]?.message}
          </Text>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#3333338b",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Card>
              <View style={{ marginHorizontal: 16 }}>
                <Text
                  h4
                  h4Style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginBottom: 12,
                  }}
                >
                  Formulario de Pasajero Externo
                </Text>
                <FormProvider {...formMethods}>{children}</FormProvider>

                <Button
                  title="Guardar Datos"
                  containerStyle={{
                    width: "100%",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                  onPress={formMethods.handleSubmit(onSubmit, onErrors)}
                />
                <Button
                  title="Limpiar Campos"
                  variant="warning"
                  containerStyle={{
                    width: "100%",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                  onPress={() => {
                    resetValues();
                  }}
                />
                <Button
                  title="Salir"
                  variant="danger"
                  containerStyle={{
                    width: "100%",
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setVisible(false);
                  }}
                />
              </View>
            </Card>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default FormWrapper;
