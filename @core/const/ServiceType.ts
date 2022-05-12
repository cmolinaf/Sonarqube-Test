export type Holder = {
  [key: string]: string | number;
};

export const serviceType: Holder = {
  "0": "Error",
  "1": "Transporte",
  "2": "Préstamo Sueldo Base",
  "3": "Anticipo",
  "4": "Asignación",
  "5": "Beca",
  "6": "Alimentación",
  "7": "Venta de Vacaciones",
  "8": "Suplantación",
  "9": "Alojamiento",
  "41": "Asignación Matricula",
  "51": "Beca Enseñanza Media",
  "52": "Beca Enseñanza Superior",
  "53": "Beca Enseñanza Pre Básica",
  "54": "Beca Enseñanza Básica",
  "55": "Beca E. Media Excelencia A.",
  "56": "Beca Continuidad de Estudios",
  "57": "Beca E.Académica Rol PDP",
  "58": "Beca Postgrado 2021",
};
export enum serviceTypeId {
  "Error" = 0,
  "Transporte" = 1,
  "Préstamo Sueldo Base" = 2,
  "Anticipo" = 3,
  "Asignación" = 4,
  "Beca" = 5,
  "Alimentación" = 6,
  "Venta de Vacaciones" = 7,
  "Suplantación" = 8,
  "Alojamiento" = 9,
  "Asignación Matricula" = 41,
  "Beca Enseñanza Media" = 51,
  "Beca Enseñanza Superior" = 52,
  "Beca Enseñanza Pre Básica" = 53,
  "Beca Enseñanza Básica" = 54,
  "Beca E. Media Excelencia A." = 55,
  "Beca Continuidad de Estudios" = 56,
  "Beca E.Académica Rol PDP" = 57,
  "Beca Postgrado 2021" = 58,
}

export function getServiceType(
  value: string | number | undefined
): string | number {
  const index = typeof value === "string" ? value : value?.toString() || "0";

  return serviceType[index];
}

export function getServiceIndex(value: string) {
  return serviceTypeId[value];
}
