import { DownloadDirectoryPath, downloadFile as dw } from "react-native-fs";
import notifee from "@notifee/react-native";

interface file {
  name: string;
}

export const downloadFile = async (name: file): Promise<unknown> => {
  //Define path to store file along with the extension
  const path = `${DownloadDirectoryPath}/${name.name}`;
  const now = new Date();
  const itemCode = now.getTime();
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  // a
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });
  //Call downloadFile
  const response = await dw({
    fromUrl: `https://cmp.grupoavanza.com/api/download/download.php?n=${name.name}`,
    toFile: path,
    headers: headers,
    begin: async () => {
      console.log("inicia la descarga");
      await notifee.displayNotification({
        id: `download.document-${itemCode}`,
        title: "Descargando documento",
        body: `Descargando ${name.name}`,
        android: {
          channelId,
          onlyAlertOnce: true,
          progress: {
            max: 100,
            current: 0,
          },
        },
      });
    },
    progress: async (res) => {
      if (res.bytesWritten < res.contentLength) {
        await notifee.displayNotification({
          id: `download.document-${itemCode}`,
          title: "Descargando documento",
          body: `Descargando ${name.name}`,
          android: {
            channelId,
            progress: {
              max: 100,
              current: (res.bytesWritten / res.contentLength) * 100,
            },
          },
        });
      } else {
        await notifee.displayNotification({
          id: `download.document-${itemCode}`,
          title: "Finalizando descarga...",
          body: `Descargando ${name.name}`,
          android: {
            channelId,
            progress: {
              indeterminate: true,
            },
          },
        });
      }
    },
  });
  return response.promise.then(async (res: unknown) => {
    //Transform response
    await notifee.cancelNotification(`download.document-${itemCode}`);
    if (res && res.statusCode === 200 && res.bytesWritten > 0) {
      console.log("download: ", res);
      await notifee.displayNotification({
        id: `download.document-${itemCode}`,
        title: "Descarga Terminada",
        body: `Se descargo el documento adjunto: ${name.name}`,
        data: {
          filePath: path,
        },
        android: {
          channelId,
          pressAction: {
            id: "open-downloaded-file",
          },
        },
      });
    } else {
      console.error(res, name.name);
      await notifee.displayNotification({
        id: `download.document-${itemCode}`,
        title: "Error al descargar",
        body: `Algo ha ocurrido durante la descarga de ${name.name}`,
        android: {
          channelId,
        },
      });
    }
  });
};
