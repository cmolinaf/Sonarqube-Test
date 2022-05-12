import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";
import { $color } from "@/assets/colors";
import Button from "@core/elements/Button/Button";
import Card from "@core/elements/Card/Card";
import { $http } from "@libs/axios";
import { downloadFile } from "@/utils/downloadFile";
import DocumentPicker from "react-native-document-picker";
import { Storage } from "@libs/storage";
import { userDataProps } from "@/types";
import { useSelector } from "react-redux";

interface DocumentProps {
  nro_file: string;
  filename: string;
  tipo: string;
  descripcion: string;
  fecha_documento: string;
}

interface Props {
  applicationId: string;
  becaDocument: DocumentProps[];
  applicationUserUID: {
    [key: string]: unknown;
  }[];
}

const BecaDocumentView: React.FC<Props> = ({
  applicationId,
  becaDocument,
  applicationUserUID,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataProps>();
  const [documentList, setDocumentList] = useState<DocumentProps[]>();
  const perfilState = useSelector((state) => state.perfil.perfil);

  useEffect(() => {
    handleOnEnter();
  }, []);

  const handleOnEnter = async () => {
    setLoading(true);
    const userInfo = await Storage.getUserData();
    setUserData(userInfo);
    setDocumentList(becaDocument);
    setLoading(false);
  };

  const sendDocument = async ({
    newItem,
    isDeleting = false,
    currentIndex,
  }: {
    newItem?: {
      type: string;
      uri: string;
      name: string;
    };
    isDeleting?: boolean;
    currentIndex: number;
  }) => {
    try {
      setLoading(true);
      if (documentList && documentList[currentIndex]) {
        const auxDocumentList = documentList;

        if (isDeleting) {
          auxDocumentList[currentIndex] = {
            ...documentList[currentIndex],
            fecha_documento: "0",
            filename: "0",
          };
        } else {
          if (newItem) {
            const now = new Date();
            const nowTime = now.getTime();

            const fileName = await `${nowTime}-${newItem.name}`.replace(
              /\s/g,
              ""
            );

            const itemToSend = await { ...newItem, name: fileName };

            const fileData = new FormData();
            await fileData.append("archivo", itemToSend);
            console.log("comienza subir archivo");

            await $http.post(
              "https://cmp.grupoavanza.com/api/upload/upload_beca.php",
              fileData
            );
            auxDocumentList[currentIndex] = await {
              ...documentList[currentIndex],
              fecha_documento: `${`${now.getDate()}`.padStart(2, "0")}-${`${
                now.getMonth() + 1
              }`.padStart(2, "0")}-${now.getFullYear()}`,
              filename: fileName,
            };
          }
        }
        const formData = new FormData();
        await formData.append("id_bandeja", applicationId);
        await formData.append("d", JSON.stringify(auxDocumentList));

        const sendDocumentData = await $http.post(
          "https://cmp.grupoavanza.com/api/sac/dev.php?a=asm7",
          formData
        );

        if (typeof sendDocumentData.data !== "number") {
          throw Error;
        }

        setDocumentList(auxDocumentList);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      throw Error;
    }
  };

  const checkValidDocument = (document: DocumentProps) => {
    return (
      document.filename &&
      document.filename !== "0" &&
      document.fecha_documento &&
      document.fecha_documento !== "0"
    );
  };

  const checkCanEdit = () => {
    return (
      userData?.nro === applicationUserUID[0].nro ||
      perfilState === 7 ||
      perfilState === 2 ||
      perfilState === 1
    );
  };

  // components
  interface RenderListItemProps {
    item: DocumentProps;
    index: number;
  }

  const RenderListItem: React.FC<RenderListItemProps> = ({ item, index }) => {
    return (
      <ListItem>
        <View style={{ width: "100%" }}>
          {/* title */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginBottom: 8,
            }}
          >
            <View style={{ flex: 4 }}>
              {checkValidDocument(item) && (
                <ListItem.Subtitle>{item.fecha_documento}</ListItem.Subtitle>
              )}
              <ListItem.Title style={{ fontWeight: "bold" }}>
                {item.descripcion}
              </ListItem.Title>
            </View>
            {checkValidDocument(item) && checkCanEdit() && (
              <View style={{ flex: 1 }}>
                <Button
                  // contentType='clean'
                  variant="danger"
                  icon={<Icon name="delete" color={$color.danger} />}
                  onPress={() => {
                    Alert.alert(
                      "Eliminar",
                      `Esta seguro que deseas eliminar el documento ${item.descripcion}?`,
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () =>
                            sendDocument({
                              isDeleting: true,
                              currentIndex: index,
                            }),
                        },
                      ]
                    );
                  }}
                />
              </View>
            )}
          </View>
          {/* download button */}
          {checkValidDocument(item) ? (
            <Button
              title="Descargar Documento"
              contentType="filled"
              onPress={() => downloadFile({ name: item.filename })}
            />
          ) : (
            <>
              {checkCanEdit() && (
                <Button
                  title="Subir Documento"
                  variant="success"
                  onPress={async () => {
                    try {
                      const res = await DocumentPicker.pick({
                        // Provide which type of file you want user to pick
                        type: [DocumentPicker.types.allFiles],
                        // There can me more options as well
                        // DocumentPicker.types.allFiles
                        // DocumentPicker.types.images
                        // DocumentPicker.types.plainText
                        // DocumentPicker.types.audio
                        // DocumentPicker.types.pdf
                      });
                      if (res) {
                        let uri = res[0].uri;
                        const name = res[0].name;
                        const type = res[0].type;
                        if (Platform.OS === "ios") {
                          // Remove 'file://' from file path for FileViewer
                          uri = res[0].uri.replace("file://", "");
                        }
                        Alert.alert(
                          "Verifique",
                          `Esta seguro que desea subir el archivo ${name} como ${item.descripcion}?`,

                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                sendDocument({
                                  newItem: {
                                    uri: uri,
                                    name: name,
                                    type: `${type}`,
                                  },
                                  currentIndex: index,
                                }),
                            },
                          ]
                        );
                      }
                    } catch (err) {
                      // Handling Exception
                      if (DocumentPicker.isCancel(err)) {
                        // If user canceled the document selection
                        console.error("Canceled");
                      } else {
                        // For Unknown Error
                        console.error("Unknown Error: " + JSON.stringify(err));
                        throw err;
                      }
                    }
                  }}
                />
              )}
            </>
          )}
        </View>
      </ListItem>
    );
  };

  return (
    <View>
      {/* table of documents */}
      <Card>
        {/* header */}
        <Text
          h4
          h4Style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: 20,
          }}
        >
          Lista de Documentos
        </Text>
        {/* iterate list */}
        {documentList && !isLoading ? (
          documentList.map((item, index, currentArray) => (
            <>
              <RenderListItem
                // eslint-disable-next-line
                key={`document-list-${applicationId}-item-${item.nro_file}`}
                item={item}
                index={index}
              />
              {index < currentArray.length - 1 && <Card.Divider />}
            </>
          ))
        ) : (
          <ActivityIndicator size="large" color={$color.warning} />
        )}
      </Card>
    </View>
  );
};

export default BecaDocumentView;
