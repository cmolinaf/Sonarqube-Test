import React from "react";
import { View } from "react-native";
import DetailsListItem from "./DetailsListItem";
import Button from "@core/elements/Button/Button";
import ShowUsers from "@core/elements/showUsers/ShowUsers";
import { downloadFile } from "@/utils/downloadFile";

interface Props {
  details: {
    [key: string]: unknown;
  };
}

const DetailsByType: React.FC<Props> = ({ details }) => {
  return (
    <>
      {/* transporte */}
      {details.tipo === 1 && (
        <>
          <DetailsListItem
            title="Fecha Servicio"
            value={details.fecha_servicio}
          />
          <DetailsListItem
            title="Hora Servicio"
            value={details.tiempo_servicio}
          />
          <DetailsListItem title="Valle Actual" value={details.valle_actual} />
          <DetailsListItem
            title="Destino Desde"
            value={details.destinio_desde}
          />
          <DetailsListItem
            title="Destino Hasta"
            value={details.destino_hasta}
          />
          <DetailsListItem title="Tipo Servicio" value={details.slc_servicio} />
          <ShowUsers value={details.pasajeros} />
        </>
      )}
      {/* préstamo */}
      {details.tipo === 2 && (
        <>
          <DetailsListItem title="Teléfono" value={details.telefono} />
          <DetailsListItem title="Correo" value={details.correo} />
        </>
      )}
      {/* anticipo */}
      {details.tipo === 3 && (
        <>
          <DetailsListItem title="Monto Solicitante" value={details.monto} />
          <DetailsListItem title="Teléfono" value={details.telefono} />
          <DetailsListItem title="Correo" value={details.correo} />
        </>
      )}
      {/* asignación */}
      {details.tipo === 4 && (
        <>
          <DetailsListItem title="Teléfono" value={details.telefono} />
          <DetailsListItem title="Correo" value={details.correo} />
          <DetailsListItem title="Tipo" value={details.tipo_asignacion} />
          {/* tipo nacimiento */}
          {details.tipo_asignacion === "Asignación por Nacimiento" && (
            <>
              <DetailsListItem
                title="Nombre Hijo / Hija"
                value={details.hijo}
              />
              <DetailsListItem title="Madre / Padre" value={details.madre} />
              <DetailsListItem title="RUT R/N" value={details.rut_hijo} />
              <DetailsListItem
                title="N° de Inscripción"
                value={details.id_inscripcionh}
              />
              <DetailsListItem
                title="Fecha Nacimiento"
                value={details.fecha_nacimientoh}
              />
              <DetailsListItem title="Lugar" value={details.lugarh} />
              {details?.doc_asig && details?.doc_asig !== "" && (
                <View
                  style={{
                    marginHorizontal: 12,
                    marginBottom: 12,
                  }}
                >
                  <Button
                    title="Descargar Documento de Respaldo"
                    flex={0}
                    onPress={() => downloadFile({ name: details?.doc_asig })}
                  />
                </View>
              )}
              {details?.doc_caja && details?.doc_caja !== "" && (
                <View
                  style={{
                    marginHorizontal: 12,
                    marginBottom: 12,
                  }}
                >
                  <Button
                    title="Descargar Caja de Compensación"
                    flex={0}
                    onPress={() => downloadFile({ name: details?.doc_caja })}
                  />
                </View>
              )}
            </>
          )}
          {/* tipo matrimonio */}
          {details.tipo_asignacion === "Asignación por Matrimonio" && (
            <>
              <DetailsListItem title="Cónyuge" value={details.conyuge} />
              <DetailsListItem title="RUT" value={details.ruta} />
              <DetailsListItem
                title="N° de Inscripción"
                value={details.id_inscripcionm}
              />
              <DetailsListItem
                title="Fecha Matrimonio"
                value={details.fecha_matrimonio}
              />
              <DetailsListItem title="Ciudad" value={details.lugarm} />
            </>
          )}
          {details.tipo_asignacion === "Asignación por Defunción" && (
            <>
              <DetailsListItem title="Nombre" value={details.nombre} />
              <DetailsListItem title="Parentesco" value={details.parentesco} />
              <DetailsListItem
                title="N° de Inscripción"
                value={details.id_inscripcionf}
              />
              <DetailsListItem
                title="Fecha Matrimonio"
                value={details.fecha_nacimientof}
              />
              <DetailsListItem title="Ciudad" value={details.lugarf} />
            </>
          )}
        </>
      )}
      {/* beca */}
      {details.tipo === 5 && (
        <>
          <DetailsListItem
            title="Carga Familiar - Nombre"
            value={details.carga_nombre}
          />
          <DetailsListItem
            title="Carga Familiar - DNI"
            value={details.carga_seleccionada}
          />
          <DetailsListItem title="Tipo Proceso" value={details.tipo_proceso} />
          {details.tipo_proceso === "Continuidad" && (
            <DetailsListItem title="Promedio" value={details.promedio} />
          )}
          <DetailsListItem
            title="Nivel Educacional"
            value={details.nivel_educacional}
          />
          <DetailsListItem
            title="Nombre Institución"
            value={details.nombre_institucion}
          />
          <DetailsListItem title="Ciudad" value={details.ciudad} />
        </>
      )}
      {/* alojamiento */}
      {details.tipo === 9 && (
        <>
          <DetailsListItem
            title="Fecha Servicio"
            value={details.fecha_servicio}
          />
          <DetailsListItem title="Campamento" value={details.campamento} />
          <ShowUsers value={details.pasajeros} />
        </>
      )}
    </>
  );
};

export default DetailsByType;
