import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { $color } from "@/assets/colors";
import Button from "@core/elements/Button/Button";
import { FormInput } from "@core/forms/formInputs";
import { roleType } from "@const/Rols";
import { $http } from "@libs/axios";
import { Storage } from "@libs/storage";

interface Props {
  idSolicitud: number | string;
}

interface observationProps {
  perfil: number | string;
  fecha: string;
  usuario: string;
  observacion: string;
  full_date: Date;
}

interface FormValues {
  observation: string;
}

const ObservationChat: React.FC<Props> = ({ idSolicitud }) => {
  const [dataToRender, setDataToRender] = useState<observationProps[]>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [userUsername, setUserUsername] = useState("");
  const isFocused = useIsFocused();
  const formMethods = useForm<FormValues>();
  const observationWatch = formMethods.watch("observation");

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getObservationData({
        returnValue: false,
      });
    }
  }, [isFocused]);

  const getUserData = async () => {
    const userData = await Storage.getUserData();
    setUserUsername(userData.username);
  };

  const getObservationData = async ({
    returnValue = false,
  }: {
    returnValue: boolean;
  }) => {
    try {
      if (!returnValue) setInitialLoading(true);
      const observationData = await $http.get(
        `https://cmp.grupoavanza.com/api/sac/dev.php?a=asm5&i=${idSolicitud}`
      );
      if (!returnValue) {
        setDataToRender(observationData.data);
        setInitialLoading(false);
      } else {
        return observationData.data;
      }
    } catch (err) {
      throw Error;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      setLoading(true);

      // const actualContent: observationProps[] = await getObservationData({
      //   returnValue: true,
      // });

      // console.log('recibido', actualContent, actualContent.equals(dataToRender));

      const userData = await Storage.getUserData();
      const now = new Date();
      const currentItems = dataToRender ?? [];
      const dataToSend: observationProps[] = [
        ...currentItems,
        {
          perfil: userData.perfil,
          observacion: form.observation,
          fecha: `${now.getDate()}-${("0" + (now.getMonth() + 1)).slice(
            -2
          )}-${now.getFullYear()}`,
          full_date: now,
          usuario: userData.username,
        },
      ];

      const formData = new FormData();

      formData.append("id_bandeja", idSolicitud);
      formData.append("o", JSON.stringify(dataToSend));

      console.log(formData);
      const sendData = await $http.post(
        "https://cmp.grupoavanza.com/api/sac/dev.php?a=asm4",
        formData
      ); //URL_AXIOS

      if (sendData.data !== 1) {
        throw Error;
      }

      await getObservationData({
        returnValue: false,
      });

      formMethods.reset();

      setLoading(false);
    } catch (err) {
      console.error(err);
      throw Error;
    }
  };

  const onErrors: SubmitErrorHandler<FormValues> = (error) => {
    console.warn(error);
    throw Error;
  };

  // render components
  const RenderItem = ({ item }: { item: observationProps }) => {
    // Verificar validaciones de quien es el usuario HACER
    const isUser = item.usuario === userUsername;
    return (
      <View
        style={[
          styles.itemContainer,
          isUser ? styles.itemOwnContainer : styles.itemOtherContainer,
        ]}
      >
        {/* usuario */}
        <View style={styles.itemUserContainer}>
          <Text style={styles.itemUserUsername}>
            {isUser ? "Yo" : item.usuario}
          </Text>
          <Text> . </Text>
          <Text style={styles.itemUserRole}>{roleType[item.perfil]}</Text>
        </View>
        {/* content */}
        <View
          style={[
            styles.itemTextContainer,
            isUser
              ? styles.itemOwnTextContainer
              : styles.itemOtherTextContainer,
          ]}
        >
          <Text style={[styles.itemText, isUser ? styles.itemOwnText : {}]}>
            {item.observacion}
          </Text>
        </View>
        {/* date */}
        <View style={styles.itemDateContainer}>
          <Text style={styles.itemDate}>{item.fecha}</Text>
        </View>
      </View>
    );
  };

  const RenderEmpty = () => {
    return (
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {initialLoading ? (
            <ActivityIndicator size="large" color={$color.warning} />
          ) : (
            <Text
              style={{
                paddingHorizontal: 12,
                textAlign: "center",
                color: "#adadad",
                fontSize: 18,
              }}
            >
              {"No hay observaciones aun"}
            </Text>
          )}
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {/* chatList */}
      <FlatList
        data={
          dataToRender
            ? dataToRender.slice().sort((a, b) => {
                const aDate = new Date(a.full_date);
                const bDate = new Date(b.full_date);
                return bDate.getTime() - aDate.getTime();
              })
            : []
        }
        renderItem={RenderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginVertical: 8,
            }}
          />
        )}
        ListEmptyComponent={RenderEmpty}
        keyExtractor={(item: observationProps) => {
          // eslint-disable-next-line
          return `${item.usuario}-${item.full_date}`;
        }}
        inverted={dataToRender && dataToRender.length != 0 ? true : false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      />
      {/* message input */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            marginTop: 6,
            paddingVertical: 6,
            paddingRight: 12,
            shadowColor: "#333",
            shadowOffset: {
              width: 4,
              height: -2,
            },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: -4,
          }}
        >
          <View
            style={{
              flex: 6,
            }}
          >
            <FormProvider {...formMethods}>
              <FormInput
                name="observation"
                placeholder="Observación"
                multiline
                inputStyle={{ maxHeight: 120 }}
                disabled={loading || initialLoading}
                errorStyle={{
                  display: "none",
                }}
              />
            </FormProvider>
          </View>

          <Button
            containerStyle={{ flex: 1 }}
            disabled={!observationWatch || loading || initialLoading}
            onPress={formMethods.handleSubmit(onSubmit, onErrors)}
            icon={
              <Icon
                name="send"
                size={22}
                color={
                  !observationWatch ? `${$color.primary}81` : $color.primary
                }
              />
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 6,
  },
  itemOwnContainer: {
    alignSelf: "flex-end",
  },
  itemOtherContainer: {
    alignSelf: "flex-start",
  },
  itemUserContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginHorizontal: 8,
  },
  itemUserUsername: {},
  itemUserRole: {
    color: "#666666",
    fontSize: 12,
    fontStyle: "italic",
  },
  itemTextContainer: {
    borderRadius: 12,
    maxWidth: "95%",
  },
  itemOwnTextContainer: {
    backgroundColor: $color.primary,
  },
  itemOtherTextContainer: {
    backgroundColor: "#dddddd",
  },
  itemText: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  itemOwnText: {
    color: "white",
  },
  itemDateContainer: {
    marginHorizontal: 8,
  },
  itemDate: {
    color: "#666666",
    fontSize: 12,
  },
});

export default ObservationChat;
