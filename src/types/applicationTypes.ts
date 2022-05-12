export type ApplicationProps = {
  id: string;
  id_bandeja: string;
  id_solicitud: string;
  documento: string;
  documento_1: string;
  document_1: string;
  documento_2: string | null;
  detalle: string;
  detalle2: string | null;
  fecha_creacion: string;
  estado: string;
  documento_beca: {
    nro_file: string;
    tipo: string;
    descripcion: string;
    fecha_documento: string;
  }[];
  evaluacion_servicio: string | null;
  fecha_pago: string | null;
  estado_bandeja: string;
  observacion: string | null;
  json: string;
};
