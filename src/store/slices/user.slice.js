import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Asegúrate de importar axios

export const userSlice = createSlice({
  name: "user",
  initialState: {
		user: "",
		error: ""
	},
  reducers: {
    setUser: (state, action) => {
      // Aquí debes actualizar el estado, no devolver un nuevo objeto
      state.user = action.payload.user;
      state.error = action.payload.error;
    },
    clearUser:(state) => {
      state.user = "";
      state.error = "";
    }
  },
});

// Exporta la acción setUser para poder utilizarla en el thunk
export const { setUser } = userSlice.actions;

// Corrige la función getUsersThunk para que sea un thunk y use dispatch correctamente
export const getUsersThunk = (urlRoute, data) => (dispatch) => {
  axios
    .post(urlRoute, data)
    .then((resp) => {
      dispatch(
        setUser({
          user: resp.data, 
          error: {},
        })
      );
    })
    .catch((error) => {
      dispatch(
        setUser({
          user: {}, 
          error: error.data,
        })
      );
    });
};

export const userToken = createSlice({
  name: 'token',
  initialState: '',
  reducers : {
    setToken: (_,action)=>{
      return action.payload
    }
  }
})