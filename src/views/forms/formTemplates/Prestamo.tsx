import React, { useEffect } from "react";
import { View } from "react-native";
import { InformationCard } from "@core/elements/InformationCard";
import { saveForm } from "@/utils/saveForm";
import { Storage } from "@libs/storage";
import FormButtonGroup from "@core/forms/FormButtonGroup";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormInput from "@core/forms/formInputs/FormInput";

// inputs names
const INPUT_FIELDS = {
  monto: "monto",
  telefono: "telefono",
  correo: "correo",
};

interface FormValues {
  monto: string;
  telefono: string;
  correo: string;
}

const Prestamo = () => {
  const formMethods = useForm<FormValues>();

  // manually reset data from changeable inputs
  const resetValues = () => {
    formMethods.resetField("correo");
    formMethods.resetField("telefono");
  };

  // get data to display in inputs
  const getmontoUser = async () => {
    try {
      // get salary from AsyncStorage
      const userData = await Storage.getUserData();
      // place data in `monto` input
      formMethods.setValue("monto", userData.sueldo_base);
    } catch (err) {
      // catch error on getting user salary from AsyncStorage
      formMethods.setError("monto", {
        type: "manual",
        message: "No se pudo obtener el sueldo base",
      });
    }
  };

  // on component enter, get user salary
  useEffect(() => {
    getmontoUser();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      // extract useless data
      const { monto, ...newForm } = form;
      // package data
      const sendData = { ...newForm, tipo: 2 };
      // try to send data to API
      const isSaved = await saveForm({ appendData: sendData });
      // check if API request OK
      if (typeof isSaved === "number") {
        throw Error;
      }
    } catch (err) {
      // handle API error
      throw Error;
    }
  };

  const onErrors: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("error:", errors);
    throw Error;
  };

  return (
    <View>
      <InformationCard
        text={"El deposito se realizara en un plazo de 10 días hábiles."}
      ></InformationCard>
      <FormProvider {...formMethods}>
        <FormInput
          name={INPUT_FIELDS.monto}
          label="Sueldo Base"
          placeholder="Cargando..."
          keyboardType="numeric"
          disabled
        />
        <FormInput
          name={INPUT_FIELDS.telefono}
          label="Teléfono"
          placeholder="Teléfono de Contacto"
          keyboardType="phone-pad"
          rules={{ required: "El Teléfono es requerido!" }}
        />
        <FormInput
          name={INPUT_FIELDS.correo}
          label="Correo"
          placeholder="Correo de Contacto"
          keyboardType="email-address"
          rules={{ required: "El Correo es requerido!" }}
        />
      </FormProvider>
      <FormButtonGroup
        resetValues={resetValues}
        onSave={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  );
};

export default Prestamo;
