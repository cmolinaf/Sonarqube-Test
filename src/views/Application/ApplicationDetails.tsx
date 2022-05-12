import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import ApplicationStatus from "@core/applications/ApplicationStatus";
import DetailsListItem from "./components/DetailsListItem";
import Button from "@core/elements/Button/Button";
import { getServiceType } from "@const/ServiceType";
import { ApplicationProps, userDataProps } from "@/types";
import { $http } from "@libs/axios";
import { Storage } from "@libs/storage";
import DetailsByType from "./components/DetailsByType";
import { AppRoute } from "@const/AppRoute";
import { useSelector } from "react-redux";

interface Props {
  applicationData: ApplicationProps;
}

const ApplicationDetails: React.FC<Props> = ({ applicationData }) => {
  const navigation = useNavigation();
  const perfilState = useSelector((state) => state.perfil.perfil);
  const details = JSON.parse(applicationData.detalle)[0];
  const [state, setState] = useState(applicationData.estado_bandeja);

  const changeStatus = async (isAcepted: boolean) => {
    try {
      const userData: userDataProps = await Storage.getUserData();

      const formData = new FormData();
      formData.append("estado", isAcepted ? 2 : 4);
      formData.append("id_persona", userData.uid);
      formData.append("id_bandeja", applicationData?.id_bandeja);
      formData.append("tk", userData.token);

      const isSaved = await $http.post(
        "https://cmp.grupoavanza.com/api/sac/dev.php?a=asm2",
        formData
      );

      if (typeof isSaved === "number") {
        throw Error("Error de transferencia");
      }

      // goBack();
      setState(isAcepted ? "2" : "4");
    } catch (err: unknown) {
      console.error("error al guardar: ", err);
      Alert.alert("Error", "Verifique su conexión y vuelva a intentar", [
        {
          text: "Aceptar",
        },
      ]);
      throw Error(err);
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        {/* title */}
        <View style={styles.titleConainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>{getServiceType(details.tipo)}</Text>
            <Text> #{applicationData.id_bandeja}</Text>
          </View>
          <View style={styles.stateWrapper}>
            <ApplicationStatus status={state} />
          </View>
        </View>
        <Card.Divider />
        {/* content */}
        <>
          {/* detalles del solicitante */}
          <>
            <Card.Title> Detalles del Solicitante </Card.Title>
            <DetailsListItem title="Usuario" value={details.solicitante} />
            <DetailsListItem title="Nombre de usuario" value={details.no} />
            <DetailsListItem title="RUT" value={details.rut} />
            <DetailsListItem title="Unidad" value={details.unidad_org} />
            <DetailsListItem title="Cargo" value={details.cargo} />
            <DetailsListItem title="División" value={details.division} />
            <DetailsListItem title="Subdivisión" value={details.subdivision} />
            <DetailsListItem title="Email" value={details.email} />
          </>
          <Card.Divider />
          {/* detalles de la solicitud */}
          <>
            <Card.Title> Detalles de la Solicitud </Card.Title>
            <DetailsListItem
              title="Fecha Creación"
              value={applicationData.fecha_creacion}
            />
            <DetailsByType details={details} />
          </>
          <Card.Divider />
          {/* detalles extra */}
          <Card.Title> Detalles Extra </Card.Title>
          {/* <DatePicker
          label='Fecha de autorización'
          date={date}
          title='Fecha de autorización'
          changeDate={handleChangeDate}
        /> */}
          <Button
            title="Observaciones"
            containerStyle={{ marginHorizontal: 12, marginBottom: 18 }}
            contentType="filled"
            onPress={async () => {
              const parametros = await {
                title: AppRoute.ObservationChatScreen,
                param: {
                  idSolicitud: applicationData.id_bandeja,
                },
              };
              navigation.navigate(
                parametros.title as never,
                parametros.param as never
              ); // corregir typos
            }}
          />
          {details.tipo === 5 && (
            <Button
              title="Documentos"
              containerStyle={{ marginHorizontal: 12 }}
              onPress={async () => {
                const parametros = await {
                  title: AppRoute.BecaDocumentScreen,
                  param: {
                    applicationId: applicationData.id_bandeja,
                    applicationUserUID: JSON.parse(applicationData.json),
                    becaDocument: JSON.parse(applicationData.documento_beca),
                  },
                };
                navigation.navigate(
                  parametros.title as never,
                  parametros.param as never
                ); // corregir typos
              }}
            />
          )}
        </>

        <Card.Divider />
        {/* buttons */}
        <View style={styles.buttonsContainer}>
          {/* accept/reject buttons */}
          {applicationData.estado_bandeja === "1" &&
            state === "1" &&
            perfilState === 1 && (
              <View style={styles.firstRowButtons}>
                <View style={styles.firstRowButtonsContainerOne}>
                  <Button
                    variant="success"
                    contentType="filled"
                    title="Aceptar"
                    onPress={() => {
                      Alert.alert(
                        "Atención",
                        "Usted va a aceptar esta solicitud",
                        [
                          {
                            text: "Aceptar",
                            onPress: () => {
                              changeStatus(true);
                            },
                          },
                          {
                            text: "Cancelar",
                          },
                        ]
                      );
                    }}
                  />
                </View>
                <View style={styles.firstRowButtonsContainerTwo}>
                  <Button
                    variant="danger"
                    contentType="filled"
                    title="Rechazar"
                    onPress={() => {
                      Alert.alert(
                        "Atención",
                        "Usted va a rechazar esta solicitud",
                        [
                          {
                            text: "Aceptar",
                            onPress: () => {
                              changeStatus(false);
                            },
                          },
                          {
                            text: "Cancelar",
                          },
                        ]
                      );
                    }}
                  />
                </View>
              </View>
            )}
          <Button title="Volver" onPress={() => goBack()} />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
  titleConainer: {
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 6,
    flex: 1,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexWrap: "wrap",
    flex: 3,
  },
  titleText: {
    fontSize: 24,
    textAlign: "center",
  },
  stateWrapper: {
    justifyContent: "center",
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  buttonsContainer: {
    padding: 12,
    justifyContent: "flex-end",
  },
  firstRowButtons: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 12,
  },
  firstRowButtonsContainerOne: {
    flex: 1,
    marginRight: 6,
  },
  firstRowButtonsContainerTwo: {
    flex: 1,
    marginLeft: 6,
  },
});

export default ApplicationDetails;
