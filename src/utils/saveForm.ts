import { Alert } from "react-native";
import { $http } from "@libs/axios";
import { Storage } from "@libs/storage";

interface saveFormDataProps {
  url?: string;
  appendData: object;
}

export const saveForm = async (props: saveFormDataProps) => {
  const {
    appendData,
    url = "https://cmp.grupoavanza.com/api/sac/dev.php?a=asm",
  } = props;
  try {
    const currentTime = new Date();
    const userData = await Storage.getUserData();
    const newData = [
      {
        // form data
        ...appendData,
        // userData
        fecha_creacion: `${`${currentTime.getDate()}`.padStart(2, "0")}-${`${
          currentTime.getMonth() + 1
        }`.padStart(2, "0")}-${currentTime.getFullYear()}`,
        solicitante: userData.no,
        nro: userData.nro,
        division: userData.division,
        subdivision: userData.subdivision,
        unidad_org: userData.unidad_org,
        rut: userData.rut,
        cargo: userData.cargo,
        rol: userData.rol,
        fecha_ingreso: userData.fecha_ingreso,
        email: userData.email,
        estado: 1,
      },
    ];

    const formData = new FormData();
    formData.append("u", userData.username);
    formData.append("tk", userData.token);
    formData.append("detalle", JSON.stringify(newData));

    const sendData = await $http.post(url, formData); //URL_AXIOS

    console.log("sendData, ", sendData.data);

    // const stored = await Storage.appendApplication(newData);
    // console.log('se guardo ', stored);
    // const getApplications = await Storage.getAllApplications();
    // console.log('todas las solicitudes', getApplications);

    Alert.alert(
      `Se registro la solicitud correctamente, Id Solicitud: ${sendData.data}`
    );

    return sendData;
  } catch (err) {
    console.error("error al mandar: ", err);
    throw Error(err as string | undefined);
  }
};
