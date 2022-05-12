import React from "react";
import { Alert, View } from "react-native";
import FormButtonGroup from "@core/forms/FormButtonGroup";
import { saveForm } from "@/utils/saveForm";
import { saveFile } from "@/utils/saveFile";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  FormDatePicker,
  FormInput,
  FormPicker,
  FormSelect,
} from "@core/forms/formInputs";

// inputs names
const INPUT_FIELDS = {
  telefono: "telefono",
  correo: "correo",
  tipo_asignacion: "tipo_asignacion",
  // 'complementario': 'FALTA'

  // hijo
  hijo: "hijo",
  madre: "madre",
  rut_hijo: "rut_hijo",
  id_inscripcionh: "id_inscripcionh",
  fecha_nacimientoh: "fecha_nacimientoh",
  lugarh: "lugarh",

  // matrimonio
  conyuge: "conyuge",
  ruta: "ruta",
  id_inscripcionm: "id_inscripcionm",
  fecha_matrimonio: "fecha_matrimonio",
  lugarm: "lugarm",

  // fallecimiento
  nombre: "nombre",
  parentesco: "parentesco",
  id_inscripcionf: "id_inscripcionf",
  fecha_nacimientof: "fecha_nacimientof",
  lugarf: "lugarf",

  // documents
  doc_asig: "doc_asig",
  doc_caja: "doc_caja",
};

interface FormValues {
  telefono: string;
  correo: string;
  tipo_asignacion: string;
  hijo: string;
  madre: string;
  rut_hijo: string;
  id_inscripcionh: string;
  fecha_nacimientoh: Date;
  lugarh: string;
  conyuge: string;
  ruta: string;
  id_inscripcionm: string;
  fecha_matrimonio: Date;
  lugarm: string;
  nombre: string;
  parentesco: string;
  id_inscripcionf: string;
  fecha_nacimientof: Date;
  lugarf: string;
  doc_asig: {
    name: string;
    type: string;
    uri: string;
  };
  doc_caja: {
    name: string;
    type: string;
    uri: string;
  };
}

const Asignacion = () => {
  const formMethods = useForm<FormValues>();
  const typeWatch = formMethods.watch("tipo_asignacion");

  // reset data from changeable inputs
  const resetValues = () => {
    formMethods.reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      // working on data before send
      let response1: string | null = null; // handle first response
      let response2: string | null = null; // handle second response
      // sending first files
      if (
        form.doc_asig &&
        form.doc_asig.name &&
        form.doc_asig.type &&
        form.doc_asig.uri
      ) {
        const now = new Date();
        const nowTime = now.getTime();
        // if this response is ok, return new file name
        response1 = await saveFile({
          name: `${nowTime}${form.doc_asig.name}`,
          type: form.doc_asig.type,
          uri: form.doc_asig.uri,
        });
      }
      // sending second files
      if (
        form.doc_caja &&
        form.doc_caja.name &&
        form.doc_caja.type &&
        form.doc_caja.uri
      ) {
        const now = new Date();
        const nowTime = now.getTime();
        // if this response is ok, return new file name
        response2 = await saveFile({
          name: `${nowTime}${form.doc_caja.name}`,
          type: form.doc_caja.type,
          uri: form.doc_caja.uri,
        });
      }
      let documents = {};
      if (response1 || response2) {
        documents = {
          doc_asig: response1,
          doc_caja: response2,
        };
      }
      // handle date and time
      let formTime = {};
      if (form.fecha_matrimonio) {
        const fechaAux = new Date(form.fecha_matrimonio);
        formTime = {
          fecha_matrimonio: `${fechaAux.getFullYear()}-${(
            "0" +
            (fechaAux.getMonth() + 1)
          ).slice(-2)}-${fechaAux.getDate()}`,
        };
      }
      if (form.fecha_nacimientof) {
        const fechaAux = new Date(form.fecha_nacimientof);
        formTime = {
          fecha_nacimientof: `${fechaAux.getFullYear()}-${(
            "0" +
            (fechaAux.getMonth() + 1)
          ).slice(-2)}-${fechaAux.getDate()}`,
        };
      }
      if (form.fecha_nacimientoh) {
        const fechaAux = new Date(form.fecha_nacimientoh);
        formTime = {
          fecha_nacimientoh: `${fechaAux.getFullYear()}-${(
            "0" +
            (fechaAux.getMonth() + 1)
          ).slice(-2)}-${fechaAux.getDate()}`,
        };
      }
      // package data
      const sendData = {
        tipo: 4,
        ...form,
        ...formTime,
        ...documents,
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
  const titleOfTypes = {
    defunction: "Asignación por Defunción",
    wedding: "Asignación por Matrimonio",
    born: "Asignación por Nacimiento",
  };
  const optionList = [
    titleOfTypes.defunction,
    titleOfTypes.wedding,
    titleOfTypes.born,
  ];

  return (
    <View>
      {/* <InformationRequest text={'El siguiente proceso tiene como limite el 50% de la renta liquida mensual'}></InformationRequest> */}
      <FormProvider {...formMethods}>
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

        {/* display types of Asignacion */}
        <FormSelect
          name={INPUT_FIELDS.tipo_asignacion}
          label="Tipo"
          placeholder="Seleccionar Tipo de Asignación"
          rules={{ required: "El Tipo de Asignación es requerido!" }}
          options={optionList}
        />

        {/* display inputs by types of Asignacion */}
        {typeWatch === titleOfTypes.defunction && (
          <>
            <FormInput
              name={INPUT_FIELDS.nombre}
              label="Nombre"
              placeholder="Nombre"
              keyboardType="default"
              rules={{ required: "El Nombre es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.parentesco}
              label="Parentesco"
              placeholder="Parentesco"
              keyboardType="default"
              rules={{ required: "El Parentesco es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.id_inscripcionf}
              label="N° de Inscripción"
              placeholder="N° de Inscripción"
              keyboardType="number-pad"
              rules={{ required: "El Nombre es requerido!" }}
            />
            <FormDatePicker
              name={INPUT_FIELDS.fecha_nacimientof}
              label="Fecha de Defunción"
              placeholder="Fecha de Defunción"
              rules={{ required: "La Fecha es requerida!" }}
            />
            <FormInput
              name={INPUT_FIELDS.lugarf}
              label="Cuidad"
              placeholder="Cuidad"
              keyboardType="default"
              rules={{ required: "la Ciudad es requerida!" }}
            />
          </>
        )}
        {typeWatch === titleOfTypes.wedding && (
          <>
            <FormInput
              name={INPUT_FIELDS.conyuge}
              label="Cónyuge"
              placeholder="Cónyuge"
              keyboardType="default"
              rules={{ required: "El Cónyuge es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.ruta}
              label="RUT"
              placeholder="RUT"
              keyboardType="default"
              rules={{ required: "El RUT es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.id_inscripcionm}
              label="N° de Inscripción"
              placeholder="N° de Inscripción"
              keyboardType="number-pad"
              rules={{ required: "El N° de Inscripción es requerido!" }}
            />
            <FormDatePicker
              name={INPUT_FIELDS.fecha_matrimonio}
              label="Fecha de Matrimonio"
              placeholder="Fecha de Matrimonio"
              rules={{ required: "La Fecha es requerida!" }}
            />
            <FormInput
              name={INPUT_FIELDS.lugarm}
              label="Cuidad"
              placeholder="Cuidad"
              keyboardType="default"
              rules={{ required: "la Ciudad es requerida!" }}
            />
          </>
        )}
        {typeWatch === titleOfTypes.born && (
          <>
            <FormInput
              name={INPUT_FIELDS.hijo}
              label="Nombre Hijo / Hija"
              placeholder="Nombre Hijo / Hija"
              keyboardType="default"
              rules={{ required: "El Nombre Hijo / Hija es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.madre}
              label="Madre / Padre"
              placeholder="Madre / Padre"
              keyboardType="default"
              rules={{ required: "El Nombre Madre / Padre es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.rut_hijo}
              label="RUT R/N"
              placeholder="RUT R/N"
              keyboardType="default"
              rules={{ required: "El RUT R/N es requerido!" }}
            />
            <FormInput
              name={INPUT_FIELDS.id_inscripcionh}
              label="N° de Inscripción"
              placeholder="N° de Inscripción"
              keyboardType="number-pad"
              rules={{ required: "El RUT R/N es requerido!" }}
            />
            <FormDatePicker
              name={INPUT_FIELDS.fecha_nacimientoh}
              label="Fecha de Nacimiento"
              placeholder="Fecha de Nacimiento"
              rules={{ required: "La Fecha es requerida!" }}
            />
            <FormInput
              name={INPUT_FIELDS.lugarh}
              label="Lugar"
              placeholder="Lugar"
              keyboardType="default"
              rules={{ required: "El RUT R/N es requerido!" }}
            />
            <FormPicker
              name={INPUT_FIELDS.doc_asig}
              label="Documento de Respaldo"
              placeholder="Documento de Respaldo"
            />
            <FormPicker
              name={INPUT_FIELDS.doc_caja}
              label="Caja de Compensación"
              placeholder="Caja de Compensación"
            />
          </>
        )}
      </FormProvider>

      <FormButtonGroup
        resetValues={resetValues}
        onSave={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  );
};

export default Asignacion;
