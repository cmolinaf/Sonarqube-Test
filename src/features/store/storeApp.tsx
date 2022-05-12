import { configureStore } from "@reduxjs/toolkit";
import loginLoadingSlice from "../slices/loginSlice";
import perfilSlice from "../slices/perfilSlice";

export default configureStore({
  reducer: {
    isLoading: loginLoadingSlice,
    perfil: perfilSlice,
  },
});
