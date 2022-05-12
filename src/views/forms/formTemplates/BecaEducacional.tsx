import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { saveForm } from "@/utils/saveForm";
import FormButtonGroup from "@core/forms/FormButtonGroup";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormInput, FormSelect } from "@core/forms/formInputs";
import { Storage } from "@libs/storage";
import { $http } from "@libs/axios";

// inputs names
const INPUT_FIELDS = {
  nombre_institucion: "nombre_institucion",
  ciudad: "ciudad",
  comuna: "comuna", // ??
  promedio: "promedio",

  carga_familiar: "carga_familiar",
  tipo_proceso: "tipo_proceso",
  nivel_educacional: "nivel_educacional",
};

interface FormValues {
  nombre_institucion: string;
  ciudad: string;
  comuna: string;
  promedio: string;
  carga_familiar: {
    [key: string]: unknown;
  };
  tipo_proceso: string;
  nivel_educacional: string;
}

const BecaEducacional = () => {
  const formMethods = useForm<FormValues>();
  const typeProcessWatch = formMethods.watch("tipo_proceso");
  const [cargaFamiliarOptions, setCargaFamiliarOptions] = useState([]);
  const [isLoadingCargaFamiliarOptions, setLoadingCargaFamiliarOptions] =
    useState(true);

  // reset data from changeable inputs
  const resetValues = () => {
    formMethods.reset();
  };

  const getCargaFamiliar = async () => {
    try {
      setLoadingCargaFamiliarOptions(true);
      const userData = await Storage.getUserData();

      const responseCargaFamiliar = await $http.get(
        `https://cmp.grupoavanza.com/api/sac/dev.php?a=asm6&nro=${userData.nro}`
      );

      setCargaFamiliarOptions(responseCargaFamiliar.data);
      setLoadingCargaFamiliarOptions(false);
    } catch (err) {
      console.error(err);
      throw Error;
    }
  };

  useEffect(() => {
    getCargaFamiliar();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      // package data
      const sendData = {
        tipo: 5,
        ...form,
        carga_familiar: [form.carga_familiar],
        carga_nombre: [
          form.carga_familiar.nombre,
          form.carga_familiar.apellido_paterno,
          form.carga_familiar.apellido_materno,
        ].join(" "),
        carga_seleccionada: form.carga_familiar.rut,
        documento_becas: [
          {
            nro_file: "0",
            filename: "0",
            tipo: "0",
            descripcion: "Certificado de alumno regular",
            fecha_documento: "0",
          },
          {
            nro_file: "1",
            filename: "0",
            tipo: "0",
            descripcion: "Notas enseñanza media",
            fecha_documento: "0",
          },
          {
            nro_file: "2",
            filename: "0",
            tipo: "0",
            descripcion: "Puntaje PTU",
            fecha_documento: "0",
          },
          {
            nro_file: "3",
            filename: "0",
            tipo: "0",
            descripcion: "Otros ( certificado de notas universitario)",
            fecha_documento: "0",
          },
        ],
      };
      // try to send data to API
      const isSaved = await saveForm({ appendData: sendData });
      // check if API request OK
      if (typeof isSaved === "number") {
        throw Error("Error de transferencia");
      }
    } catch (err: unknown) {
      // handle API error
      console.error("error al guardar: ", err);
      Alert.alert("Error", "Verifique su conexión y vuelva a intentar", [
        {
          text: "Aceptar",
        },
      ]);
      throw Error;
    }
  };

  const onErrors: SubmitErrorHandler<FormValues> = (errors) => {
    console.warn(errors);
    throw Error;
  };

  // defined options of select inputs
  const tipoProcesoValues = {
    nuevo_proceso: "Nuevo Proceso",
    continuidad: "Continuidad",
  };
  const tipoProcesoOptions = [
    tipoProcesoValues.nuevo_proceso,
    tipoProcesoValues.continuidad,
  ];
  const nivelEducacionalOptions = ["Pre Escolar", "Escolar", "Superior"];

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormSelect
          name={INPUT_FIELDS.carga_familiar}
          label="Carga Familiar"
          disabled={!cargaFamiliarOptions || cargaFamiliarOptions.length <= 0}
          placeholder={
            isLoadingCargaFamiliarOptions
              ? "Cargando..."
              : "Seleccionar Carga Familiar"
          }
          rules={{ required: "La Carga Familiar es requerida!" }}
          keyText="nombre"
          options={cargaFamiliarOptions}
        />
        <FormSelect
          name={INPUT_FIELDS.tipo_proceso}
          label="Tipo Proceso"
          placeholder="Seleccionar Tipo Proceso"
          rules={{ required: "El Tipo de Proceso es requerido!" }}
          options={tipoProcesoOptions}
        />
        {typeProcessWatch === tipoProcesoValues.continuidad && (
          <>
            <FormInput
              name={INPUT_FIELDS.promedio}
              label="Promedio"
              placeholder="Promedio"
              keyboardType="phone-pad"
              rules={{ required: "El Promedio es requerido!" }}
            />
          </>
        )}
        <FormSelect
          name={INPUT_FIELDS.nivel_educacional}
          label="Nivel Educacional"
          placeholder="Seleccionar Nivel Educacional"
          rules={{ required: "El Nivel Educacional es requerido!" }}
          options={nivelEducacionalOptions}
        />
        <FormInput
          name={INPUT_FIELDS.nombre_institucion}
          label="Nombre Institución"
          placeholder="Nombre Institución"
          keyboardType="default"
          rules={{ required: "El Nombre Institución es requerido!" }}
        />
        <FormInput
          name={INPUT_FIELDS.ciudad}
          label="Ciudad Institución"
          placeholder="Ciudad Institución"
          keyboardType="default"
          rules={{ required: "La Ciudad Institución es requerida!" }}
        />
      </FormProvider>

      <FormButtonGroup
        resetValues={resetValues}
        onSave={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  );
};

export default BecaEducacional;
