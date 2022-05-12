import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";
import { Card } from "react-native-elements";
import { useDispatch } from "react-redux";
import { toggleLoggedIn } from "@/features/slices/loginSlice";
import { Storage } from "@libs/storage";
import { $http } from "@libs/axios";

import { StackNavigationProp } from "@react-navigation/stack";
import { userDataProps } from "@/types";
import Button from "@core/elements/Button/Button";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormInput } from "@core/forms/formInputs";
import { $color } from "@/assets/colors";
import backgroundImage from "@/assets/img/login.jpg";

type RootStackParamList = {
  // solución temporal a la espera de un contenedor global
  HomeScreen: { userID: number };
};

// inputs names
const LOGIN_FIELDS = {
  username: "username",
  password: "password",
};

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const formMethods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      // package formData with login credentials
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);

      // post to api to validate and return user data
      const { data }: { data: userDataProps[] | number } = await $http.post(
        "https://cmpsrv00.grupoavanza.com/login",
        formData
      ); //URL_AXIOS

      // check if data returned is user or unvalidated credentials
      if (typeof data !== "number") {
        // append username to userData request
        const userData = { ...data[0], username: form.username };
        // change redux loggedIn status
        dispatch(toggleLoggedIn);
        // save userData in AsyncStorage
        await Storage.storeUserData(userData);
        // save user Token in AsyncStorage
        await Storage.storeToken(userData.token);
        // navigate to HomeScreen
        navigation.navigate("HomeScreen", { userID: userData.uid });
        // clear form data
        formMethods.reset();
      } else {
        // set Error in unvalidated credentials
        throw Error;
      }
    } catch (err) {
      // display inputs error messages
      formMethods.setError(LOGIN_FIELDS.username, {
        type: "manual",
        message: "Usuario Invalido!",
      });
      formMethods.setError(LOGIN_FIELDS.password, {
        type: "manual",
        message: "Clave Invalida!",
      });
    }
  };

  const onErrors: SubmitErrorHandler<FormValues> = async (errors) => {
    // code on error
    console.warn("El error: ", errors);
  };

  return (
    <SafeAreaView style={styles.contenedorVista}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View>
          <Card containerStyle={styles.card}>
            <Card.Title>Iniciar Sesión</Card.Title>
            <Card.Divider />
            <FormProvider {...formMethods}>
              <FormInput
                name={LOGIN_FIELDS.username}
                label="Username"
                testID="login.username"
                autoCapitalize="none"
                placeholder="Username"
                rules={{ required: "El Username es requerido!" }}
              />
              <FormInput
                name={LOGIN_FIELDS.password}
                label="Clave"
                testID="login.password"
                autoCapitalize="none"
                placeholder="***"
                secureTextEntry={true}
                rules={{ required: "La Clave es requerida!" }}
              />
              <Button
                title="Entrar"
                containerStyle={{ marginHorizontal: 12 }}
                disabled={formMethods.formState.isSubmitting}
                loading={formMethods.formState.isSubmitting}
                onPress={formMethods.handleSubmit(onSubmit, onErrors)}
                contentType="filled"
                testID="loginButton"
              />
            </FormProvider>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedorVista: {
    display: "flex",
    flex: 1,
  },
  background: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: $color.primary,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
});
export default Login;
