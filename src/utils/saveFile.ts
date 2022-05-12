import $http from "@libs/axios/axios";

interface file {
  name: string;
  type: string;
  uri: string;
}

export const saveFile = async (file: file) => {
  const formData = new FormData();
  formData.append("archivo", {
    name: file.name.replace(/\s/g, ""),
    type: file.type,
    uri: file.uri,
  });
  // console.log('envio: ', file.name.replace(/\s/g, ''))

  try {
    await $http.post(
      "https://cmp.grupoavanza.com/api/upload/subir.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log('respuesta: ', response)
    return file.name.replace(/\s/g, "");
  } catch (err) {
    console.error("error al enviar archivo: ", err);
    throw Error(err as string | undefined);
  }
};
