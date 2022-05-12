import React from "react";
import { View } from "react-native";
import { saveForm } from "@/utils/saveForm";
import FormButtonGroup from "@core/forms/FormButtonGroup";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  FormDatePicker,
  FormSearchUsers,
  FormSelect,
} from "@core/forms/formInputs";

// inputs names
const INPUT_FIELDS = {
  fecha_servicio: "fecha_servicio",
  campamento: "campamento",
  pasajeros: "pasajeros",

  destino_desde: "destinio_desde",
  destino_hasta: "destino_hasta",
  justificacion: "justificacion",
  slc_servicio: "slc_servicio",
  tiempo_servicio: "tiempo_servicio",
  srv_emergencia: "srv_emergencia", // checkbox
  srv_recurrente: "srv_recurrente", // checkbox
  fecha_termino: "fecha_termino",
};

interface FormValues {
  fecha_servicio: string;
  campamento: string;
  pasajeros: unknown[];
  destinio_desde: string;
  destino_hasta: string;
  justificacion: string;
  slc_servicio: string;
  tiempo_servicio: string;
  srv_emergencia: boolean;
  srv_recurrente: boolean;
  fecha_termino: Date;
}

const Alojamiento = () => {
  const formMethods = useForm<FormValues>();

  const resetValues = () => {
    formMethods.reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      // handle date and time
      const fechaAux = new Date(form.fecha_servicio);
      // package data
      const sendData = {
        ...form,
        fecha_servicio: `${fechaAux.getFullYear()}-${
          fechaAux.getMonth() + 1
        }-${fechaAux.getDate()}`,
        tipo: 9,
      };
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
    console.warn(errors);
    throw Error;
  };

  // defined options of select inputs
  const campamentosOptions = ["PLANTA 1", "PLANTA 2", "FAENA 1", "FAENA 2"];

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormDatePicker
          name={INPUT_FIELDS.fecha_servicio}
          label="Fecha Solicitud Deseada"
          placeholder="Fecha Solicitud Deseada"
          rules={{ required: "La Fecha es requerida!" }}
        />
        <FormSelect
          name={INPUT_FIELDS.campamento}
          label="Campamento"
          placeholder="Seleccionar Campamento"
          rules={{ required: "El Campamento es requerido!" }}
          options={campamentosOptions}
        />
        <FormSearchUsers
          name={INPUT_FIELDS.pasajeros}
          label="Pasajeros"
          selectType="multiselect"
          searchRoute={({ searchValue }) => {
            return `https://testapiga.herokuapp.com/users/activos?user=${searchValue}`;
          }}
          rules={{ required: "El o los Pasajeros son requeridos!" }}
        />
      </FormProvider>
      <FormButtonGroup
        resetValues={resetValues}
        onSave={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  );
};

export default Alojamiento;
