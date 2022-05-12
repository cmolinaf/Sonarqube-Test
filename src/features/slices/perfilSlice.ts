import { createSlice } from "@reduxjs/toolkit";

interface state {
  perfil: number | null;
}

const initialPerfilState: state = {
  perfil: null,
};

export const perfilSlice = createSlice({
  name: "perfil",
  initialState: initialPerfilState,
  reducers: {
    togglePerfilUser: (state: state) => {
      if (state.perfil != 6) state.perfil = 6;
    },
    togglePerfilAdmin: (state: state) => {
      if (state.perfil != 1) state.perfil = 1;
    },
  },
});

export const selectorPerfilState = ({ perfil }: state) => perfil;

export const { togglePerfilUser, togglePerfilAdmin } = perfilSlice.actions;

export default perfilSlice.reducer;
