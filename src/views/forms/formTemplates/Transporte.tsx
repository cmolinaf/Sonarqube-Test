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
  FormInput,
  FormSearchUsers,
  FormSelect,
} from "@core/forms/formInputs";
import { Storage } from "@libs/storage";

// inputs names
const INPUT_FIELDS = {
  destino_desde: "destinio_desde",
  destino_hasta: "destino_hasta",
  fecha_servicio: "fecha_servicio",
  justificacion: "justificacion",
  slc_servicio: "slc_servicio",
  tiempo_servicio: "tiempo_servicio",
  srv_emergencia: "srv_emergencia", // checkbox
  srv_recurrente: "srv_recurrente", // checkbox
  fecha_termino: "fecha_termino",
  valle_actual: "valle_actual",
  pasajeros: "pasajeros",
};

interface FormValues {
  destinio_desde: string;
  destino_hasta: string;
  fecha_servicio: Date;
  justificacion: string;
  slc_servicio: string;
  tiempo_servicio: Date;
  srv_emergencia: string;
  srv_recurrente: string;
  fecha_termino: string;
  valle_actual: string;
  pasajeros: string;
}

const Transporte = () => {
  const formMethods = useForm<FormValues>();

  // reset data from changeable inputs
  const resetValues = () => {
    formMethods.reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      // working on data before send
      const userData = await Storage.getUserData(); // get user data from AsyncStorage
      // handle observación format
      const observacionAux = form.justificacion;
      // handle date and time
      const fechaAux = new Date(form.fecha_servicio);
      const tiempoAux = new Date(form.tiempo_servicio);
      // package data
      const sendData = {
        ...form,
        justificacion: [
          {
            perfil: userData.perfil,
            usuario: userData.uid,
            observacion: observacionAux,
            fecha: new Date(),
          },
        ],
        tiempo_servicio: `${("0" + tiempoAux.getHours()).slice(-2)}:${(
          "0" + tiempoAux.getMinutes()
        ).slice(-2)}`,
        fecha_servicio: `${fechaAux.getFullYear()}-${(
          "0" +
          (fechaAux.getMonth() + 1)
        ).slice(-2)}-${fechaAux.getDate()}`,
        tipo: 1,
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
  const valleActualOptions = [
    "CMP VALLE DEL HUASCO",
    "CMP VALLE DEL ELQUI",
    "CMP VALLE COPIAPO",
  ];
  const RECORRIDO = ["Planta", "Corporativo", "Aeropuerto", "Mutual"];
  const recorridoDesdeOptions = RECORRIDO;
  const recorridoHastaOptions = RECORRIDO;
  const tipoServicio = [
    "Acercamientos",
    "Contingencia social/manifestaciones",
    "Desmovilización de células",
    "Mantenciones Programadas",
    "Mantención No Programadas",
    "Personal Backup que sube a faena",
  ];

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormDatePicker
          name={INPUT_FIELDS.fecha_servicio}
          label="Fecha Solicitud Deseada"
          placeholder="Fecha Solicitud Deseada"
          rules={{ required: "La Fecha es requerida!" }}
        />
        <FormDatePicker
          name={INPUT_FIELDS.tiempo_servicio}
          label="Hora Solicitud Deseada"
          placeholder="Hora Solicitud Deseada"
          mode="time"
          rules={{ required: "La Hora es requerida!" }}
        />
        <FormSelect
          name={INPUT_FIELDS.valle_actual}
          label="Valle Actual"
          placeholder="Seleccionar Valle Actual"
          rules={{ required: "El Valle Actual es requerido!" }}
          options={valleActualOptions}
        />
        <FormSelect
          name={INPUT_FIELDS.destino_desde}
          label="Recorrido - Desde"
          placeholder="Seleccionar Recorrido - Desde"
          rules={{ required: "El Recorrido es requerido!" }}
          options={recorridoDesdeOptions}
        />
        <FormSelect
          name={INPUT_FIELDS.destino_hasta}
          label="Recorrido - Hasta"
          placeholder="Seleccionar Recorrido - Hasta"
          rules={{ required: "El Recorrido es requerido!" }}
          options={recorridoHastaOptions}
        />
        <FormSearchUsers
          name={INPUT_FIELDS.pasajeros}
          label="Pasajeros"
          selectType="multiselect"
          useToolbar
          searchRoute={({ searchValue }) => {
            return `https://testapiga.herokuapp.com/users/activos?user=${searchValue}`;
          }}
          rules={{ required: "El o los Pasajeros son requeridos!" }}
        />
        <FormInput
          name={INPUT_FIELDS.justificacion}
          label="Observaciones"
          placeholder="Observaciones"
          keyboardType="default"
        />
        <FormSelect
          name={INPUT_FIELDS.slc_servicio}
          label="Tipo de Servicio"
          placeholder="Tipo de Servicio"
          rules={{ required: "El Tipo de Servicio es requerido!" }}
          options={tipoServicio}
        />
      </FormProvider>
      <FormButtonGroup
        resetValues={resetValues}
        onSave={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  );
};

export default Transporte;
