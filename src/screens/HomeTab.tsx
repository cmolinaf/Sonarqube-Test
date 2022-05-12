import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { $color } from "@/assets/colors";
import {
  togglePerfilAdmin,
  togglePerfilUser,
} from "@/features/slices/perfilSlice";
import { Storage } from "@libs/storage";
import AdminHome from "@/views/home/AdminHome";
import Home from "@/views/home/Home";
import ResumenSolicitudes from "@/views/home/UserHome";

const HomeTab = () => {
  const perfilState = useSelector((state) => state.perfil.perfil);
  const dispatch = useDispatch();

  const getPerfilUser = async () => {
    try {
      const userData = await Storage.getUserData();

      if (userData.perfil === 6) dispatch(togglePerfilUser());
      if (userData.perfil === 1) dispatch(togglePerfilAdmin());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!perfilState) {
      getPerfilUser();
    }
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {perfilState ? (
        <>
          <Home>
            {perfilState === 1 && <AdminHome />}
            {perfilState === 6 && <ResumenSolicitudes />}
          </Home>
        </>
      ) : (
        <>
          <View style={style.container}>
            <ActivityIndicator size="large" color={$color.warning} />
          </View>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default HomeTab;
