import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { getServiceType } from "@const/ServiceType";
import { ApplicationProps } from "@/types";
import Button from "@core/elements/Button/Button";

import { onForegroundDownloadFile } from "@libs/notifee";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DetailsListItem from "./DetailsListItem";

interface Props {
  application: ApplicationProps;
  visible: boolean;
  showModal: (arg0: boolean) => void;
  onCloseModal: () => void;
}

const DetalleApplication: React.FC<Props> = ({
  application,
  visible = false,
  showModal,
  onCloseModal,
}) => {
  const [details, setDetails] = useState<unknown | null>(null);
  const navigation = useNavigation<StackNavigationProp<unknown, unknown>>();

  useEffect(() => {
    if (application && application.detalle) {
      setDetails(JSON.parse(application.detalle)[0]);
    }
  }, [application, visible]);

  useEffect(() => {
    if (details && (details.documento_1 || details.documento_2)) {
      return onForegroundDownloadFile();
    }
  }, [details]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible && !!application && !!details}
      onRequestClose={() => {
        showModal(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          {/* title */}
          <View style={styles.titleContainer}>
            <Text style={styles.TitleTextH1}>{"Solicitud Pendiente"}</Text>
            <Text style={styles.TitleTextH2}>
              {`${getServiceType(application?.id_solicitud)}`}{" "}
              <Text style={styles.TitleTextSmall}>
                .{application?.id_bandeja}
              </Text>
            </Text>
          </View>
          {/* content */}
          <View style={styles.contentContainer}>
            <DetailsListItem
              title="Fecha de creación"
              value={details?.fecha_creacion}
            />
          </View>
          {/* buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              title="Ver Mas"
              containerStyle={styles.buttonsMoreDetailsContainer}
              flex={0}
              onPress={() => {
                const parametros = {
                  title: "ApplicationScreen",
                  param: { data: application },
                };
                console.log(application);
                navigation.navigate(parametros.title, parametros.param);
                showModal(false);
                onCloseModal();
              }}
            />
            <Button
              title="Cerrar"
              variant="warning"
              flex={0}
              onPress={() => {
                showModal(false);
                onCloseModal();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3333338b",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    minWidth: "65%",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 22,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  titleContainer: {
    marginBottom: 15,
  },
  TitleTextH1: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  TitleTextH2: {
    fontSize: 16,
    textAlign: "center",
  },
  TitleTextSmall: {
    fontSize: 12,
  },
  contentContainer: { marginBottom: 15 },
  contentText: {
    marginBottom: 8,
  },
  contentTitle: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  buttonsMoreDetailsContainer: {
    marginBottom: 8,
  },
  buttonsContainer: {},
  buttonBox: {},
});

export default DetalleApplication;
